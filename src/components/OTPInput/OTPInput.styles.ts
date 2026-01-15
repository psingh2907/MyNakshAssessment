import { StyleSheet } from 'react-native';
import {
  COLORS,
  BORDER_RADIUS,
  SPACING,
  FONT_SIZE,
  FONT_WEIGHT,
} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
    marginVertical: SPACING.lg,
  },
  input: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
    textAlign: 'center',
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  inputFocused: {
    borderColor: COLORS.borderFocused,
    backgroundColor: COLORS.background,
  },
  inputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBackground,
  },
  inputDisabled: {
    backgroundColor: COLORS.backgroundSecondary,
    borderColor: COLORS.disabled,
    opacity: 0.6,
  },
});
