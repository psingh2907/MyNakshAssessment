import { OTP_CONFIG } from '../utils/constants';
import { STRINGS } from '../utils/strings';
import { OTPVerificationResult } from '../types';

// Mock OTP verification service
export const verifyOTP = async (
  otp: string,
): Promise<OTPVerificationResult> => {
  console.log(STRINGS.VERIFYING_OTP, otp);

  // Simulate network delay
  await new Promise<void>(resolve =>
    setTimeout(() => resolve(), OTP_CONFIG.VERIFICATION_DELAY_MS),
  );

  // Mock verification - accepts any valid 4-digit OTP
  if (otp.length === OTP_CONFIG.LENGTH && /^\d+$/.test(otp)) {
    // 10% chance of failure for testing
    const shouldFail = Math.random() < 0.1;

    if (shouldFail) {
      return {
        success: false,
        message: STRINGS.INVALID_OTP_TRY_AGAIN,
      };
    }

    return {
      success: true,
      message: STRINGS.OTP_VERIFIED_SUCCESSFULLY,
    };
  }

  return {
    success: false,
    message: STRINGS.INVALID_OTP_FORMAT,
  };
};

export const resendOTP = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  console.log(STRINGS.RESENDING_OTP);

  return {
    success: true,
    message: STRINGS.NEW_OTP_SENT,
  };
};
