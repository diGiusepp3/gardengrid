import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

export const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.lg,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.sm,
  },
});
