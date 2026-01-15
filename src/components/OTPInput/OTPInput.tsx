// Custom OTP input component

import { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useOTP } from '../../hooks/useOTP';
import { OTPInputProps } from '../../types';
import { OTP_CONFIG } from '../../utils/constants';
import { styles } from './OTPInput.styles';

export function OTPInput({
  length = OTP_CONFIG.LENGTH,
  onComplete,
  onChange,
  error = false,
  disabled = false,
  autoFocus = true,
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { otp, handleChange, handleKeyPress, handlePaste, inputRefs } = useOTP(
    length,
    onComplete,
    onChange,
  );

  useEffect(() => {
    if (autoFocus && !disabled) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [autoFocus, disabled, inputRefs]);

  const getInputStyle = (index: number, value: string) => {
    const baseStyle: any[] = [styles.input];

    if (disabled) {
      baseStyle.push(styles.inputDisabled);
    } else if (error) {
      baseStyle.push(styles.inputError);
    } else if (focusedIndex === index) {
      baseStyle.push(styles.inputFocused);
    } else if (value) {
      baseStyle.push(styles.inputFilled);
    }

    return baseStyle;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      handlePaste(value);
      return;
    }
    handleChange(index, value);
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          style={getInputStyle(index, digit)}
          value={digit}
          onChangeText={value => handleInputChange(index, value)}
          onKeyPress={({ nativeEvent }) =>
            handleKeyPress(index, nativeEvent.key)
          }
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          autoFocus={autoFocus && index === 0}
          testID={`otp-input-${index}`}
          accessibilityLabel={`OTP digit ${index + 1}`}
          accessibilityHint={
            digit
              ? `Digit ${index + 1} is ${digit}`
              : `Enter digit ${index + 1}`
          }
        />
      ))}
    </View>
  );
}
