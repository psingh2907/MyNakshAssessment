/**
 * FeedbackChips component - Like/Dislike with expandable feedback reasons
 * Uses LinearTransition for smooth chip expansion
 */

import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useChat } from '../../context/ChatContext';
import { FeedbackReason } from '../../types/chat';
import { CHAT_CONFIG } from '../../utils/constants';
import { styles } from './FeedbackChips.styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface FeedbackChipsProps {
  messageId: string;
}

function FeedbackChipsInner({ messageId }: FeedbackChipsProps) {
  const { feedback, setFeedback } = useChat();
  const messageFeedback = feedback[messageId];
  const [showChips, setShowChips] = useState(false);

  const isLiked = messageFeedback?.type === 'liked';
  const isDisliked = messageFeedback?.type === 'disliked';

  // Animation values for buttons
  const likeScale = useSharedValue(1);
  const dislikeScale = useSharedValue(1);

  const handleLike = () => {
    likeScale.value = withSequence(
      withSpring(1.1, { damping: 12, stiffness: 350 }),
      withSpring(1, { damping: 18, stiffness: 280 })
    );
    if (isLiked) {
      setFeedback(messageId, null);
    } else {
      setFeedback(messageId, 'liked');
      setShowChips(false);
    }
  };

  const handleDislike = () => {
    dislikeScale.value = withSequence(
      withSpring(1.1, { damping: 12, stiffness: 350 }),
      withSpring(1, { damping: 18, stiffness: 280 })
    );
    if (isDisliked) {
      setFeedback(messageId, null);
      setShowChips(false);
    } else {
      setFeedback(messageId, 'disliked');
      setShowChips(true);
    }
  };

  const likeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeScale.value }],
    };
  });

  const dislikeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: dislikeScale.value }],
    };
  });

  const handleChipSelect = (chipId: string) => {
    setFeedback(messageId, 'disliked', chipId as FeedbackReason);
  };

  const selectedChip = messageFeedback?.reason;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AnimatedTouchable
          style={[
            styles.button,
            isLiked && styles.buttonActive,
            likeAnimatedStyle,
          ]}
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>👍</Text>
            <Text style={[styles.buttonText, isLiked && styles.buttonTextActive]}>
              Like
            </Text>
          </View>
        </AnimatedTouchable>

        <AnimatedTouchable
          style={[
            styles.button,
            isDisliked && styles.buttonActive,
            dislikeAnimatedStyle,
          ]}
          onPress={handleDislike}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>👎</Text>
            <Text style={[styles.buttonText, isDisliked && styles.buttonTextActive]}>
              Dislike
            </Text>
          </View>
        </AnimatedTouchable>
      </View>

      {showChips && isDisliked && (
        <Animated.View
          layout={LinearTransition.springify()}
          style={styles.chipsContainer}
        >
          {CHAT_CONFIG.FEEDBACK_CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip.id}
              style={[
                styles.chip,
                selectedChip === chip.id && styles.chipSelected,
              ]}
              onPress={() => handleChipSelect(chip.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedChip === chip.id && styles.chipTextSelected,
                ]}
              >
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

export const FeedbackChips = memo(FeedbackChipsInner);
