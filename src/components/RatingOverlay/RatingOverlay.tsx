/**
 * RatingOverlay component - full-screen rating modal
 * Animated open/close for a smooth, UI-agnostic feel
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useChat } from '../../context/ChatContext';
import { StarRating } from '../StarRating/StarRating';
import { styles } from './RatingOverlay.styles';

const OPEN_SPRING = { damping: 18, stiffness: 320, mass: 0.5 };
const CLOSE_DURATION = 280;
const CLOSE_EASING = Easing.out(Easing.cubic);

export function RatingOverlay() {
  const { isRatingVisible, hideRating, sessionRating, setSessionRating } = useChat();
  const scale = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (isRatingVisible) {
      overlayOpacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.quad) });
      scale.value = withSpring(1, OPEN_SPRING);
    } else {
      overlayOpacity.value = 0;
      scale.value = 0;
    }
  }, [isRatingVisible, scale, overlayOpacity]);

  const requestClose = useCallback(() => {
    overlayOpacity.value = withTiming(0, { duration: 220, easing: CLOSE_EASING });
    scale.value = withTiming(
      0,
      { duration: CLOSE_DURATION, easing: CLOSE_EASING },
      (finished) => {
        'worklet';
        if (finished) scheduleOnRN(hideRating);
      },
    );
  }, [hideRating, overlayOpacity, scale]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSubmit = () => {
    if (sessionRating) {
      Alert.alert(
        'Thank You!',
        `Your ${sessionRating}-star rating has been recorded. Rating data has been captured.`,
        [{ text: 'OK', onPress: requestClose }],
      );
    }
  };

  if (!isRatingVisible) {
    return null;
  }

  return (
    <Modal
      visible={isRatingVisible}
      transparent
      animationType="none"
      onRequestClose={requestClose}
    >
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Animated.View style={[styles.content, contentStyle]}>
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.subtitle}>
            How would you rate your session?
          </Text>

          <View style={styles.ratingContainer}>
            <StarRating
              rating={sessionRating}
              onRatingChange={setSessionRating}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
              ]}
              onPress={requestClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                !sessionRating && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!sessionRating}
              activeOpacity={0.7}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
