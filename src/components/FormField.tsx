import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../core/theme';

type FormFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  multiline?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address';
};

export const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
}: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        placeholderTextColor={theme.semantic.textSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.semantic.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.semantic.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textPrimary,
  },
  inputMultiline: {
    minHeight: 120,
  },
});
