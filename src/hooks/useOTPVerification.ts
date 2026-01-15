/**
 * Custom hook for OTP verification logic
 */

import { useState, useCallback } from 'react';
import { OTPVerificationHookReturn } from '../types';
import { verifyOTP } from '../services/otpService';

/**
 * Hook to manage OTP verification state and logic
 */
export const useOTPVerification = (): OTPVerificationHookReturn => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (otp: string) => {
    setIsVerifying(true);
    setError(null);
    setIsSuccess(false);

    try {
      const result = await verifyOTP(otp);

      if (result.success) {
        setIsSuccess(true);
        setError(null);
      } else {
        setIsSuccess(false);
        setError(result.message || 'Verification failed. Please try again.');
      }
    } catch (err) {
      setIsSuccess(false);
      setError('An error occurred. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setIsVerifying(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsVerifying(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    isVerifying,
    isSuccess,
    error,
    verify,
    reset,
  };
};
