/**
 * Custom hook for countdown timer functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerHookReturn } from '../types';
import { OTP_CONFIG } from '../utils/constants';

/**
 * Hook to manage a countdown timer
 * @param initialSeconds - Initial countdown time in seconds
 * @returns Timer state and control functions
 */
export const useTimer = (
  initialSeconds: number = OTP_CONFIG.RESEND_TIMER_SECONDS,
): TimerHookReturn => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds]);

  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  // Format time as MM:SS
  const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60)
    .toString()
    .padStart(2, '0')}`;

  return {
    seconds,
    formattedTime,
    isActive: isActive && seconds > 0,
    reset,
    start,
  };
};
