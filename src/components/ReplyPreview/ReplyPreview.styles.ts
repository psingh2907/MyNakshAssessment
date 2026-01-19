/**
 * Styles for ReplyPreview component
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: COLORS.backgroundTertiary,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 4,
    height: 40,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.md,
    borderRadius: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
  },
  senderName: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  messageText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  cancelButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundSecondary,
    marginLeft: SPACING.sm,
  },
  cancelText: {
    fontSize: 20,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.bold,
  },
});
