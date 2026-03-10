import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, FormField, Screen } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create task</Text>
        <FormField label="Task title" value={title} onChangeText={setTitle} />
        <FormField label="Due date" value={date} onChangeText={setDate} />
        <FormField label="Notes" value={notes} onChangeText={setNotes} multiline />
        <Text style={styles.helper}>This draft screen is ready for internal testing and release builds.</Text>
        <Button label="Save task" onPress={() => {}} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  helper: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginBottom: theme.spacing.lg,
  },
});
