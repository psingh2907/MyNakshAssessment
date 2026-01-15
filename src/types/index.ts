/**
 * Global TypeScript types for the OTP verification feature
 */

export interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  testID?: string;
}

export interface TimerHookReturn {
  seconds: number;
  formattedTime: string;
  isActive: boolean;
  reset: () => void;
  start: () => void;
}

export interface OTPVerificationHookReturn {
  isVerifying: boolean;
  isSuccess: boolean;
  error: string | null;
  verify: (otp: string) => Promise<void>;
  reset: () => void;
}

export type OTPVerificationResult = {
  success: boolean;
  message?: string;
};
