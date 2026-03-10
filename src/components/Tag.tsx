import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

type TagProps = {
  label: string;
  tone?: 'default' | 'accent' | 'muted';
};

export const Tag = ({ label, tone = 'default' }: TagProps) => {
  return (
    <View style={[styles.base, styles[tone]]}>
      <Text style={[styles.text, styles[`text_${tone}`]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  default: {
    backgroundColor: theme.semantic.primarySoft,
  },
  accent: {
    backgroundColor: theme.semantic.accentSoft,
  },
  muted: {
    backgroundColor: theme.semantic.surfaceMuted,
  },
  text: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
  },
  text_default: {
    color: theme.semantic.primary,
  },
  text_accent: {
    color: theme.semantic.textPrimary,
  },
  text_muted: {
    color: theme.semantic.textSecondary,
  },
});
