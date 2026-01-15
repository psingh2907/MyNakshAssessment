// OTP Verification Screen

import { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button/Button';
import { OTPInput } from '../../components/OTPInput/OTPInput';
import { useOTPVerification } from '../../hooks/useOTPVerification';
import { useTimer } from '../../hooks/useTimer';
import { resendOTP } from '../../services/otpService';
import { OTP_CONFIG } from '../../utils/constants';
import { isValidOTP } from '../../utils/otpUtils';
import { STRINGS } from '../../utils/strings';
import { styles } from './OTPScreen.styles';

export interface OTPScreenProps {
  onVerificationSuccess?: () => void;
  email?: string;
}

export function OTPScreen({ onVerificationSuccess, email }: OTPScreenProps) {
  const [otpValue, setOtpValue] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [otpKey, setOtpKey] = useState(0);

  const timer = useTimer(OTP_CONFIG.RESEND_TIMER_SECONDS);
  const {
    isVerifying,
    isSuccess,
    error,
    verify,
    reset: resetVerification,
  } = useOTPVerification();

  const handleOTPChange = useCallback(
    (otp: string) => {
      setOtpValue(otp);
      setIsComplete(isValidOTP(otp));
      if (error) {
        resetVerification();
      }
    },
    [error, resetVerification],
  );

  const handleVerify = useCallback(
    async (otp?: string) => {
      const codeToVerify = otp || otpValue;
      if (!isValidOTP(codeToVerify)) {
        return;
      }

      Keyboard.dismiss();
      await verify(codeToVerify);
    },
    [otpValue, verify],
  );

  const handleResend = useCallback(async () => {
    if (timer.isActive) {
      return;
    }

    try {
      await resendOTP();
      setOtpValue('');
      setIsComplete(false);
      resetVerification();
      timer.reset();
      setShowSuccess(false);
      setOtpKey(prev => prev + 1);
      Keyboard.dismiss();
    } catch (err) {
      console.error(STRINGS.RESEND_OTP_ERROR, err);
    }
  }, [timer, resetVerification]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => onVerificationSuccess?.(), 1000);
    }
  }, [isSuccess, onVerificationSuccess]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{STRINGS.ENTER_VERIFICATION_CODE}</Text>
          <Text style={styles.subtitle}>
            {email
              ? `${STRINGS.VERIFICATION_CODE_SENT_TO} ${email}`
              : STRINGS.VERIFICATION_CODE_SENT_TO_EMAIL}
          </Text>

          <View style={styles.otpContainer}>
            <OTPInput
              key={otpKey}
              onComplete={handleVerify}
              onChange={handleOTPChange}
              error={!!error && !isVerifying}
              disabled={isVerifying || isSuccess}
            />

            {error && !isVerifying && (
              <Text style={styles.errorText} testID="error-message">
                {error}
              </Text>
            )}

            {showSuccess && isSuccess && (
              <Text style={styles.successText} testID="success-message">
                {STRINGS.VERIFICATION_SUCCESSFUL}
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={STRINGS.VERIFY}
              onPress={() => handleVerify()}
              disabled={!isComplete || isVerifying || isSuccess}
              loading={isVerifying}
              variant="primary"
              testID="verify-button"
            />

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                {STRINGS.DIDNT_RECEIVE_CODE}
              </Text>
              {timer.isActive ? (
                <Text style={styles.timerText} testID="timer-text">
                  {STRINGS.RESEND_IN} {timer.formattedTime}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={timer.isActive}
                  style={styles.resendButton}
                  testID="resend-button"
                >
                  <Text
                    style={[
                      styles.resendButtonText,
                      timer.isActive && styles.resendButtonTextDisabled,
                    ]}
                  >
                    {STRINGS.RESEND}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
