/**
 * ReplyPreview component - shows above input when replying
 * Animated appearance with smooth transitions
 */

import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { Message } from '../../types/chat';
import { getSenderLabel } from '../../utils/chatUtils';
import { styles } from './ReplyPreview.styles';

interface ReplyPreviewProps {
  message: Message | null;
  onCancel: () => void;
}

function ReplyPreviewInner({ message, onCancel }: ReplyPreviewProps) {
  if (!message) {
    return null;
  }

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(200).springify()}
      exiting={FadeOutUp.duration(150)}
      layout={LinearTransition.springify()}
    >
      <View style={styles.content}>
        <View style={styles.indicator} />
        <View style={styles.textContainer}>
          <Text style={styles.senderName}>Replying to {getSenderLabel(message.sender)}</Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {message.text}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton} activeOpacity={0.7}>
        <Text style={styles.cancelText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export const ReplyPreview = memo(ReplyPreviewInner);
