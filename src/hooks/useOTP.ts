import { useState, useRef, useCallback, RefObject } from 'react';
import { OTP_CONFIG } from '../utils/constants';
import {
  formatOTPToArray,
  formatOTPToString,
  extractDigits,
  isOTPComplete,
} from '../utils/otpUtils';

export interface UseOTPReturn {
  otp: string[];
  otpString: string;
  isComplete: boolean;
  setOTP: (otp: string[]) => void;
  handleChange: (index: number, value: string) => void;
  handleKeyPress: (index: number, key: string) => void;
  handlePaste: (text: string) => void;
  reset: () => void;
  inputRefs: RefObject<(any | null)[]>;
}

// Hook for managing OTP input state
export const useOTP = (
  length: number = OTP_CONFIG.LENGTH,
  onComplete?: (otp: string) => void,
  onChange?: (otp: string) => void,
): UseOTPReturn => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(any | null)[]>(Array(length).fill(null));

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow single digit (0-9)
      if (value && !/^\d$/.test(value)) {
        return;
      }

      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      const otpString = formatOTPToString(newOTP);
      onChange?.(otpString);

      // Auto-focus next input if value entered
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if complete and trigger callback
      if (isOTPComplete(newOTP)) {
        onComplete?.(otpString);
      }
    },
    [otp, length, onComplete, onChange],
  );

  const handleKeyPress = useCallback(
    (index: number, key: string) => {
      // Handle backspace
      if (key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  const handlePaste = useCallback(
    (text: string) => {
      const digits = extractDigits(text);
      if (digits.length >= length) {
        const pastedOTP = formatOTPToArray(digits, length);
        setOTP(pastedOTP);

        const otpString = formatOTPToString(pastedOTP);
        onChange?.(otpString);

        // Focus last input after paste
        if (isOTPComplete(pastedOTP)) {
          inputRefs.current[length - 1]?.focus();
          onComplete?.(otpString);
        }
      }
    },
    [length, onComplete, onChange],
  );

  const reset = useCallback(() => {
    setOTP(Array(length).fill(''));
    inputRefs.current[0]?.focus();
  }, [length]);

  const otpString = formatOTPToString(otp);
  const isComplete = isOTPComplete(otp);

  return {
    otp,
    otpString,
    isComplete,
    setOTP,
    handleChange,
    handleKeyPress,
    handlePaste,
    reset,
    inputRefs,
  };
};
