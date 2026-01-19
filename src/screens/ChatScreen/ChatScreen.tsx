/**
 * ChatScreen - Main chat interface for MyNaksh
 * Interactive chat with swipe-to-reply, reactions, and feedback
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmojiBar } from '../../components/EmojiBar/EmojiBar';
import { MessageBubble } from '../../components/MessageBubble/MessageBubble';
import { RatingOverlay } from '../../components/RatingOverlay/RatingOverlay';
import { ReplyPreview } from '../../components/ReplyPreview/ReplyPreview';
import { useChat } from '../../context/ChatContext';
import { Message } from '../../types/chat';
import { COLORS } from '../../utils/constants';
import { styles } from './ChatScreen.styles';

const EMOJI_BAR_HEIGHT = 64;
const BOTTOM_RESERVE = 100;

export function ChatScreen() {
  const {
    messages,
    replyingTo,
    setReplyingTo,
    showRating,
    addMessage,
    emojiBar,
    setEmojiBar,
    addReaction,
  } = useChat();
  const [inputText, setInputText] = useState('');
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');

  const emojiBarVisible = useSharedValue(false);
  useEffect(() => {
    emojiBarVisible.value = emojiBar != null;
  }, [emojiBar, emojiBarVisible]);

  const emojiBarTop = useMemo(() => {
    if (!emojiBar) return 0;
    const { y, height } = emojiBar.anchor;
    const belowTop = y + height + 8 - insets.top;
    const wouldOverlapBottom = belowTop + EMOJI_BAR_HEIGHT > screenHeight - insets.bottom - BOTTOM_RESERVE;
    return wouldOverlapBottom
      ? Math.max(0, y - EMOJI_BAR_HEIGHT - 8 - insets.top)
      : belowTop;
  }, [emojiBar, insets.top, insets.bottom, screenHeight]);

  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: inputText.trim(),
        timestamp: Date.now(),
        type: 'text',
        replyTo: replyingTo?.id,
      };
      addMessage(newMessage);
      setInputText('');
      setReplyingTo(null);
    }
  }, [inputText, replyingTo, addMessage, setReplyingTo]);

  // Memoize message lookup map for O(1) access
  const messageMap = useMemo(() => {
    const map = new Map<string, Message>();
    messages.forEach((msg: Message) => map.set(msg.id, msg));
    return map;
  }, [messages]);

  const getReplyingToMessage = useCallback(
    (messageId?: string): Message | undefined => {
      if (!messageId) return undefined;
      return messageMap.get(messageId);
    },
    [messageMap],
  );

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => {
      const replyingToMessage = getReplyingToMessage(item.replyTo);
      return (
        <MessageBubble
          message={item}
          replyingToMessage={replyingToMessage}
        />
      );
    },
    [getReplyingToMessage],
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  // Close emoji bar on scroll: defer so JS stays free; EmojiBar’s useAnimatedReaction runs hide then onClose.
  const handleScrollBeginDrag = useCallback(() => {
    if (!emojiBar) return;
    InteractionManager.runAfterInteractions(() => {
      emojiBarVisible.value = false;
    });
  }, [emojiBar, emojiBarVisible]);

  // Close emoji bar when tapping outside; same flow as scroll.
  const handleTapOutsideEmojiBar = useCallback(() => {
    if (!emojiBar) return;
    InteractionManager.runAfterInteractions(() => {
      emojiBarVisible.value = false;
    });
  }, [emojiBar, emojiBarVisible]);

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
  }, [setReplyingTo]);

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      if (emojiBar) addReaction(emojiBar.messageId, emoji);
    },
    [emojiBar, addReaction],
  );

  const handleEmojiBarClose = useCallback(() => {
    setEmojiBar(null);
  }, [setEmojiBar]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MyNaksh Chat</Text>
        <TouchableOpacity
          style={styles.endChatButton}
          onPress={showRating}
          activeOpacity={0.7}
        >
          <Text style={styles.endChatText}>End Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        onScrollBeginDrag={handleScrollBeginDrag}
      />

      {/* Reply Preview */}
      <ReplyPreview message={replyingTo} onCancel={handleCancelReply} />

      {/* Compose area: Input only; emoji bar is in overlay near the message */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.composeBlock}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.textTertiary}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Emoji bar overlay – tap outside to close; positioned near the long‑pressed message */}
      {emojiBar != null && (
        <View style={styles.emojiBarOverlay} pointerEvents="box-none">
          <Pressable
            style={styles.emojiBarBackdrop}
            onPress={handleTapOutsideEmojiBar}
            accessible={false}
          />
          <View style={[styles.emojiBarPosition, { top: emojiBarTop }]} pointerEvents="box-none">
            <EmojiBar
              visible={emojiBarVisible}
              onEmojiSelect={handleEmojiSelect}
              onClose={handleEmojiBarClose}
            />
          </View>
        </View>
      )}

      {/* Rating Overlay */}
      <RatingOverlay />
    </SafeAreaView>
  );
}
