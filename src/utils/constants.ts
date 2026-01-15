/**
 * Application constants
 */

export const OTP_CONFIG = {
  LENGTH: 4,
  RESEND_TIMER_SECONDS: 60,
  VERIFICATION_DELAY_MS: 1500,
} as const;

export const COLORS = {
  primary: '#007AFF',
  primaryDark: '#0051D5',
  success: '#34C759',
  error: '#FF3B30',
  errorBackground: '#FFF5F5',
  disabled: '#C7C7CC',
  border: '#E5E5EA',
  borderFocused: '#007AFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 24,
  xl: 28,
} as const;

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;
