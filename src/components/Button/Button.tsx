// Button component

import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { ButtonProps } from '../../types';
import { COLORS } from '../../utils/constants';
import { STRINGS } from '../../utils/strings';
import { styles } from './Button.styles';

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  testID,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
    isDisabled && styles.buttonDisabled,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'primary'
      ? styles.buttonTextPrimary
      : styles.buttonTextSecondary,
    isDisabled && styles.buttonTextDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? COLORS.background : COLORS.text}
          />
          <Text style={textStyle}>{STRINGS.VERIFYING}</Text>
        </View>
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
