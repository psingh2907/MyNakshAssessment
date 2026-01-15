/**
 * Centralized strings for the OTP verification feature
 * All user-facing text should be defined here for easy maintenance and i18n support
 */

export const STRINGS = {
  // Screen titles and headers
  ENTER_VERIFICATION_CODE: 'Enter Verification Code',

  // Subtitle messages
  VERIFICATION_CODE_SENT_TO: "We've sent a verification code to",
  VERIFICATION_CODE_SENT_TO_EMAIL:
    "We've sent a verification code to your email",

  // Success messages
  VERIFICATION_SUCCESSFUL: '✓ Verification successful!',
  OTP_VERIFIED_SUCCESSFULLY: 'OTP verified successfully!',
  NEW_OTP_SENT: 'New OTP has been sent.',

  // Error messages
  INVALID_OTP_TRY_AGAIN: 'Invalid OTP. Please try again.',
  INVALID_OTP_FORMAT: 'Invalid OTP format.',

  // Button labels
  VERIFY: 'Verify',
  RESEND: 'Resend',
  VERIFYING: 'Verifying...',

  // Resend section
  DIDNT_RECEIVE_CODE: "Didn't receive the code?",
  RESEND_IN: 'Resend in',

  // Console logs (for debugging)
  VERIFYING_OTP: 'Verifying OTP:',
  RESENDING_OTP: 'Resending OTP...',
  RESEND_OTP_ERROR: 'Resend OTP error:',
} as const;
