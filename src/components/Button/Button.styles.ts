import { StyleSheet } from 'react-native';
import {
  COLORS,
  BORDER_RADIUS,
  SPACING,
  FONT_SIZE,
  FONT_WEIGHT,
} from '../../utils/constants';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.background,
  },
  buttonTextPrimary: {
    color: COLORS.background,
  },
  buttonTextSecondary: {
    color: COLORS.text,
  },
  buttonTextDisabled: {
    color: COLORS.textSecondary,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  loadingIndicator: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: COLORS.background,
    borderTopColor: 'transparent',
    borderRadius: 8,
  },
});
