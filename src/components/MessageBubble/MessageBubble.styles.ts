/**
 * Styles for MessageBubble component
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    position: 'relative',
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  bubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  replyIconContainer: {
    position: 'absolute',
    left: -40,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  replyIcon: {
    fontSize: 20,
    color: COLORS.textLight,
    fontWeight: FONT_WEIGHT.bold,
  },
  bubble: {
    maxWidth: '75%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.otherBubble,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  otherBubble: {
    backgroundColor: COLORS.otherBubble,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  senderName: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    letterSpacing: 0.3,
  },
  replyPreview: {
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: BORDER_RADIUS.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  replyPreviewText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  userText: {
    color: COLORS.textLight,
  },
  timestamp: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
    alignSelf: 'flex-end',
    fontWeight: FONT_WEIGHT.medium,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  reactionsContainer: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
    alignItems: 'center',
  },
  reaction: {
    fontSize: 24,
    paddingHorizontal: SPACING.xs,
  },
  eventContainer: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.lg,
  },
  eventText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    fontWeight: FONT_WEIGHT.medium,
  },
});
