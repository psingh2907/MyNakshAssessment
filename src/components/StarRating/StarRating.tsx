/**
 * StarRating component - 5-star rating with smooth interactions and animations
 */

import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { styles } from './StarRating.styles';

interface StarRatingProps {
  rating: number | null;
  onRatingChange: (rating: number) => void;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

const STARS = [1, 2, 3, 4, 5] as const;

function StarItem({ isFilled, onPress }: { isFilled: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSequence(
      withSpring(1.3, { damping: 10, stiffness: 400 }),
      withSpring(1, { damping: 15, stiffness: 300 }),
    );
    onPress();
  }, [onPress, scale]);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.starButton}>
      <AnimatedText style={[styles.star, isFilled && styles.starFilled, animatedStyle]}>
        ★
      </AnimatedText>
    </TouchableOpacity>
  );
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <View style={styles.container}>
      {STARS.map(star => (
        <StarItem
          key={star}
          isFilled={star <= (rating || 0)}
          onPress={() => onRatingChange(star)}
        />
      ))}
    </View>
  );
}
