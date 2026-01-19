/**
 * EmojiBar component - shows icon reactions on long-press
 * Uses Ionicons; configure REACTION_ICONS in constants.
 */

import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scheduleOnRN } from 'react-native-worklets';
import { CHAT_CONFIG, COLORS, SPACING } from '../../utils/constants';
import { styles } from './EmojiBar.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const EMOJI_BAR_MAX_WIDTH = SCREEN_WIDTH - 32; // 16px margin on each side
const ICON_COUNT = CHAT_CONFIG.REACTION_ICONS.length;
const ICON_SIZE = 40;
const ICON_GAP = 2;
const ICON_PADDING = 8;
const ESTIMATED_WIDTH = (ICON_COUNT * ICON_SIZE) + ((ICON_COUNT - 1) * ICON_GAP) + (ICON_PADDING * 2);

interface EmojiBarProps {
  visible: SharedValue<boolean>;
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiBar({ visible, onEmojiSelect, onClose }: EmojiBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const SPRING_CONFIG = {
    damping: 18,
    stiffness: 350,
    mass: 0.4,
  };

  useAnimatedReaction(
    () => visible.value,
    (current) => {
      'worklet';
      if (current) {
        scheduleOnRN(setIsVisible, true);
        scale.value = withSpring(1, SPRING_CONFIG);
        opacity.value = withTiming(1, { duration: 180 });
      } else {
        scale.value = withSpring(0, { damping: 20, stiffness: 400 });
        opacity.value = withTiming(
          0,
          { duration: 120 },
          (finished) => {
            'worklet';
            if (finished) {
              scheduleOnRN(setIsVisible, false);
              scheduleOnRN(onClose);
            }
          },
        );
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      display: opacity.value > 0 ? 'flex' : 'none',
    };
  });

  const handleEmojiPress = (emoji: string) => {
    onEmojiSelect(emoji);
    visible.value = false;
  };

  if (!isVisible) {
    return null;
  }

  // Calculate if we need to reduce icon size or spacing
  const needsAdjustment = ESTIMATED_WIDTH > EMOJI_BAR_MAX_WIDTH;
  const adjustedIconSize = needsAdjustment ? 36 : 40;
  const adjustedGap = needsAdjustment ? 1 : 2;
  const adjustedPadding = needsAdjustment ? SPACING.xs : SPACING.xs + 2;

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          maxWidth: EMOJI_BAR_MAX_WIDTH,
          paddingHorizontal: adjustedPadding,
        },
      ]}
    >
      {CHAT_CONFIG.REACTION_ICONS.map((item) => (
        <View key={item.id}>
          <TouchableOpacity
            style={[
              styles.emojiButton,
              needsAdjustment && styles.emojiButtonCompact,
              {
                minWidth: adjustedIconSize,
                minHeight: adjustedIconSize,
                maxWidth: adjustedIconSize,
                maxHeight: adjustedIconSize,
                marginHorizontal: adjustedGap,
              },
            ]}
            onPress={() => handleEmojiPress(item.id)}
            activeOpacity={0.6}
          >
            <Ionicons
              name={item.name}
              size={needsAdjustment ? 20 : 24}
              color={COLORS.gold}
            />
          </TouchableOpacity>
        </View>
      ))}
    </Animated.View>
  );
}
