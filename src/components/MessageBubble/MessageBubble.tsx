/**
 * MessageBubble component with swipe-to-reply and long-press reactions
 * Uses Reanimated 4 for smooth animations on UI thread
 */

import React, { useCallback, useRef, memo } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { Message } from '../../types/chat';
import { useChat } from '../../context/ChatContext';
import { CHAT_CONFIG, COLORS } from '../../utils/constants';
import { formatMessageTime, getSenderLabel } from '../../utils/chatUtils';
import { styles } from './MessageBubble.styles';
import { FeedbackChips } from '../FeedbackChips/FeedbackChips';

interface MessageBubbleProps {
  message: Message;
  replyingToMessage?: Message;
}

const SWIPE_THRESHOLD = CHAT_CONFIG.SWIPE_THRESHOLD;
// Optimized spring config for natural feel
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
};
const SPRING_CONFIG_FAST = {
  damping: 25,
  stiffness: 400,
  mass: 0.3,
};

function MessageBubbleInner({ message, replyingToMessage }: MessageBubbleProps) {
  const { setReplyingTo, reactions, setEmojiBar } = useChat();
  const translateX = useSharedValue(0);
  const bubbleRef = useRef<View>(null);

  const openEmojiBar = useCallback(() => {
    bubbleRef.current?.measureInWindow((x, y, width, height) => {
      setEmojiBar({ messageId: message.id, anchor: { x, y, width, height } });
    });
  }, [message.id, setEmojiBar]);

  const isUserMessage = message.sender === 'user';
  const isAIMessage = message.sender === 'ai_astrologer';
  const messageReactions = reactions[message.id] || [];

  // Swipe-to-Reply gesture (only for non-user messages)
  // Optimized with velocity and better threshold handling
  const panGesture = Gesture.Pan()
    .enabled(!isUserMessage && message.type !== 'event')
    .activeOffsetX(10) // Require 10px movement before activating
    .onUpdate(e => {
      'worklet';
      // Only allow swiping right with resistance
      if (e.translationX > 0) {
        // Add resistance - slows down as you swipe further
        const resistance = 1 - Math.min(e.translationX / (SWIPE_THRESHOLD * 2), 0.5);
        translateX.value = e.translationX * resistance;
      }
    })
    .onEnd(e => {
      'worklet';
      const shouldTrigger = e.translationX > SWIPE_THRESHOLD || 
                           (e.translationX > SWIPE_THRESHOLD * 0.6 && e.velocityX > 500);
      
      if (shouldTrigger) {
        scheduleOnRN(setReplyingTo, message);
        translateX.value = withSpring(0, SPRING_CONFIG_FAST);
      } else {
        // Spring back with velocity consideration
        translateX.value = withSpring(0, {
          ...SPRING_CONFIG,
          velocity: e.velocityX * 0.1,
        });
      }
    });

  // Long-press for emoji reactions - opens emoji bar near this message
  const longPressGesture = Gesture.LongPress()
    .minDuration(250)
    .maxDistance(10)
    .onStart(() => {
      'worklet';
      scheduleOnRN(openEmojiBar);
    });

  const composedGesture = Gesture.Simultaneous(panGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    // Add slight scale effect during swipe for better feedback
    const scale = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [1, 0.98],
      Extrapolation.CLAMP,
    );
    
    return {
      transform: [
        { translateX: translateX.value },
        { scale },
      ],
    };
  });

  const replyIconStyle = useAnimatedStyle(() => {
    'worklet';
    // Smoother interpolation with easing
    const progress = Math.min(translateX.value / SWIPE_THRESHOLD, 1);
    
    // Ease-out curve for more natural feel
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    
    const opacity = interpolate(
      easedProgress,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      easedProgress,
      [0, 1],
      [0.6, 1.1], // Slight overshoot for bounce effect
      Extrapolation.CLAMP,
    );

    // Add rotation for more dynamic feel
    const rotation = interpolate(
      easedProgress,
      [0, 1],
      [-15, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        { scale },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  if (message.type === 'event') {
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.eventText}>{message.text}</Text>
      </View>
    );
  }

  return (
    <GestureDetector gesture={composedGesture}>
      <View ref={bubbleRef} style={[styles.container, isUserMessage && styles.userContainer]} collapsable={false}>
        <Animated.View style={[styles.bubbleWrapper, animatedStyle]}>
          {/* Reply Icon (revealed on swipe) */}
          <Animated.View style={[styles.replyIconContainer, replyIconStyle]}>
            <Text style={styles.replyIcon}>↩</Text>
          </Animated.View>

          {/* Message Bubble */}
          <View
            style={[
              styles.bubble,
              isUserMessage ? styles.userBubble : styles.otherBubble,
            ]}
          >
            {!isUserMessage && (
              <Text style={styles.senderName}>{getSenderLabel(message.sender)}</Text>
            )}

            {replyingToMessage && (
              <View style={styles.replyPreview}>
                <Text style={styles.replyPreviewText} numberOfLines={1}>
                  {replyingToMessage.text}
                </Text>
              </View>
            )}

            <Text style={[styles.text, isUserMessage && styles.userText]}>
              {message.text}
            </Text>

            <Text style={[styles.timestamp, isUserMessage && styles.userTimestamp]}>
              {formatMessageTime(message.timestamp)}
            </Text>

            {/* Reactions - one icon; id from REACTION_ICONS, fallback to text for legacy */}
            {messageReactions.length > 0 && (() => {
              const id = messageReactions[0];
              const icon = CHAT_CONFIG.REACTION_ICONS.find((r) => r.id === id);
              return (
                <View style={styles.reactionsContainer}>
                  {icon ? (
                    <Ionicons name={icon.name} size={20} color={COLORS.gold} />
                  ) : (
                    <Text style={styles.reaction}>{id}</Text>
                  )}
                </View>
              );
            })()}

            {/* AI Feedback */}
            {isAIMessage && message.hasFeedback !== false && (
              <FeedbackChips messageId={message.id} />
            )}
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

export const MessageBubble = memo(MessageBubbleInner);
