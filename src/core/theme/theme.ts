import { colors, semantic } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  semantic,
  spacing,
  typography,
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
  },
  shadow: {
    soft: {
      shadowColor: '#0B0D0C',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 3,
    },
  },
};

export type Theme = typeof theme;
