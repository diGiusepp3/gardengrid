import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../core/theme';

export type ScreenProps = PropsWithChildren<{
  style?: ViewStyle;
  backgroundColor?: string;
}>;

export const Screen = ({ children, style, backgroundColor }: ScreenProps) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: backgroundColor ?? theme.semantic.background },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
