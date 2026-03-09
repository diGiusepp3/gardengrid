import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { Button, Card, Screen, Section, Tag } from '../../../src/components';
import { theme } from '../../../src/core/theme';

const mapWidth = 320;
const mapHeight = 220;

export default function GardenDetailScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Backyard Kitchen Garden</Text>
          <Text style={styles.subtitle}>12m x 8m · West-facing</Text>
          <View style={styles.tagRow}>
            <Tag label="Greenhouse" />
            <Tag label="Compost" tone="muted" />
            <Tag label="Water" tone="accent" />
          </View>
        </View>

        <Section title="Garden map">
          <Card>
            <Svg width={mapWidth} height={mapHeight}>
              <Rect x={0} y={0} width={mapWidth} height={mapHeight} fill={theme.colors.stone} rx={18} />
              <Rect x={20} y={20} width={160} height={120} fill={theme.colors.sage} rx={12} />
              <Rect x={200} y={20} width={90} height={70} fill={theme.colors.leaf} rx={12} />
              <Rect x={200} y={110} width={90} height={80} fill={theme.colors.clay} rx={12} />
              <SvgText x={32} y={40} fontSize={12} fill={theme.semantic.textPrimary}>
                Main beds
              </SvgText>
              <SvgText x={210} y={40} fontSize={12} fill={theme.semantic.textPrimary}>
                Greenhouse
              </SvgText>
              <SvgText x={210} y={130} fontSize={12} fill={theme.semantic.textPrimary}>
                Compost
              </SvgText>
            </Svg>
          </Card>
        </Section>

        <Section title="Manage">
          <View style={styles.rowButtons}>
            <Link href="/gardens/1/fields" asChild>
              <Button label="Fields" variant="secondary" />
            </Link>
            <Link href="/gardens/1/rows" asChild>
              <Button label="Rows" variant="secondary" />
            </Link>
          </View>
          <View style={styles.rowButtons}>
            <Link href="/gardens/1/structures" asChild>
              <Button label="Structures" variant="secondary" />
            </Link>
            <Link href="/gardens/1/animals" asChild>
              <Button label="Animals" variant="secondary" />
            </Link>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.xs,
  },
  tagRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  rowButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
});
