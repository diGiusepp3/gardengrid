import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, FormField, Screen } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function EditPlantScreen() {
  const [name, setName] = useState('');
  const [variety, setVariety] = useState('');
  const [quantity, setQuantity] = useState('');

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add plant</Text>
        <FormField label="Plant name" value={name} onChangeText={setName} />
        <FormField label="Variety" value={variety} onChangeText={setVariety} />
        <FormField label="Quantity" value={quantity} onChangeText={setQuantity} />
        <Button label="Save plant" onPress={() => {}} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.lg,
  },
});
