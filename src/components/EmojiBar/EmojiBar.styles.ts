/**
 * Styles for EmojiBar component
 */

import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs + 2,
    marginVertical: SPACING.sm,
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: '95%',
  },
  emojiButton: {
    padding: SPACING.sm,
    marginHorizontal: 2,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundTertiary,
    minWidth: 40,
    minHeight: 40,
    maxWidth: 40,
    maxHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiButtonCompact: {
    minWidth: 36,
    minHeight: 36,
    maxWidth: 36,
    maxHeight: 36,
    padding: SPACING.xs,
    marginHorizontal: 1,
  },
  emoji: {
    fontSize: 24,
  },
  emojiCompact: {
    fontSize: 20,
  },
});
