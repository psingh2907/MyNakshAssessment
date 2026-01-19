/**
 * Styles for StarRating component
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  starButton: {
    padding: SPACING.xs,
  },
  star: {
    fontSize: 40,
    color: COLORS.border,
  },
  starFilled: {
    color: COLORS.gold,
  },
});
