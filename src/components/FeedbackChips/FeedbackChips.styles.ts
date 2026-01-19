/**
 * Styles for FeedbackChips component
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.backgroundTertiary,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  buttonIcon: {
    fontSize: 18,
  },
  buttonText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.5,
  },
  buttonTextActive: {
    color: COLORS.textLight,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundTertiary,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  chipText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 0.2,
  },
  chipTextSelected: {
    color: COLORS.textLight,
  },
});
