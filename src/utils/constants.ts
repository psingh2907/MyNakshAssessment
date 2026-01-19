/**
 * Application constants
 */

export const OTP_CONFIG = {
  LENGTH: 4,
  RESEND_TIMER_SECONDS: 60,
  VERIFICATION_DELAY_MS: 1500,
} as const;

/**
 * MyNaksh-inspired palette: cosmic purple + gold for a premium astrology feel.
 * Aligned with mynaksh.com and common astrology branding (mystical, trustworthy).
 */
export const COLORS = {
  // Primary – cosmic purple / mystic violet
  primary: '#5B4B8A',
  primaryDark: '#4A3F73',
  primaryLight: '#7D6BA8',
  primaryGradient: ['#5B4B8A', '#6B5B95'],

  // Gold – premium accent (stars, key CTAs, highlights)
  gold: '#C9A227',
  goldLight: '#E5C76B',

  // Semantic
  success: '#0D9488',
  error: '#DC2626',
  warning: '#D97706',
  info: '#5B4B8A',

  // Backgrounds – warm ivory/cream
  background: '#FAF8F5',
  backgroundSecondary: '#F5F1EB',
  backgroundTertiary: '#EDE9E1',
  backgroundDark: '#2C2838',

  // Text
  text: '#2C2838',
  textSecondary: '#5C5466',
  textTertiary: '#8E8694',
  textLight: '#FAF8F5',

  // UI
  disabled: '#C4BDB5',
  border: '#E5E0D8',
  borderLight: '#EDE9E1',
  borderFocused: '#5B4B8A',

  // Bubbles
  userBubble: '#5B4B8A',
  userBubbleGradient: ['#5B4B8A', '#6B5B95'],
  otherBubble: '#F0EDE6',
  otherBubbleDark: '#E5E0D8',

  // Shadows – warm cast
  shadow: 'rgba(44, 40, 56, 0.08)',
  shadowDark: 'rgba(44, 40, 56, 0.12)',
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

// Chat-specific constants
/** Reaction icons: id is stored in state, name is the Ionicons glyph. Change these to customize. */
export const CHAT_CONFIG = {
  SWIPE_THRESHOLD: 80, // pixels to trigger reply
  REACTION_ICONS: [
    { id: 'heart', name: 'heart' },
    { id: 'star', name: 'star' },
    { id: 'thumbs-up', name: 'thumbs-up' },
    { id: 'moon', name: 'moon' },
    { id: 'sparkles', name: 'sparkles' },
    { id: 'ribbon', name: 'ribbon' },
  ] as const,
  FEEDBACK_CHIPS: [
    { id: 'inaccurate', label: 'Inaccurate' },
    { id: 'too_vague', label: 'Too Vague' },
    { id: 'too_long', label: 'Too Long' },
  ],
} as const;
