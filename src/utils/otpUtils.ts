/**
 * OTP utility functions
 */

import { OTP_CONFIG } from './constants';

/**
 * Validates if a string is a valid OTP (only digits)
 */
export const isValidOTP = (otp: string): boolean => {
  return /^\d+$/.test(otp) && otp.length === OTP_CONFIG.LENGTH;
};

/**
 * Formats OTP string to array of individual digits
 */
export const formatOTPToArray = (otp: string, length: number = OTP_CONFIG.LENGTH): string[] => {
  const digits = otp.split('').slice(0, length);
  // Pad with empty strings if needed
  while (digits.length < length) {
    digits.push('');
  }
  return digits;
};

/**
 * Formats OTP array to string
 */
export const formatOTPToString = (otpArray: string[]): string => {
  return otpArray.join('');
};

/**
 * Checks if OTP is complete (all digits filled)
 */
export const isOTPComplete = (otpArray: string[]): boolean => {
  return otpArray.every(digit => digit !== '' && /^\d$/.test(digit));
};

/**
 * Extracts numeric digits from a string (for paste handling)
 */
export const extractDigits = (text: string): string => {
  return text.replace(/\D/g, '');
};
