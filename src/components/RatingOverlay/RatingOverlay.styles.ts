/**
 * Styles for RatingOverlay component
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../utils/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 40, 56, 0.9)', // backgroundDark #2C2838 – cosmic overlay
  },
  content: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg + 8,
    padding: SPACING.xl + 8,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  title: {
    fontSize: FONT_SIZE.xl + 4,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  ratingContainer: {
    marginVertical: SPACING.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.backgroundTertiary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  cancelButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  submitButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: 0.5,
  },
});
