import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
};

export const Button = ({ label, onPress, variant = 'primary' }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, styles[`label_${variant}`]]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: theme.semantic.primary,
  },
  secondary: {
    backgroundColor: theme.semantic.primarySoft,
    borderWidth: 1,
    borderColor: theme.semantic.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.semantic.border,
  },
  label: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.md,
  },
  label_primary: {
    color: theme.semantic.surface,
  },
  label_secondary: {
    color: theme.semantic.primary,
  },
  label_ghost: {
    color: theme.semantic.textPrimary,
  },
  pressed: {
    opacity: 0.85,
  },
});
