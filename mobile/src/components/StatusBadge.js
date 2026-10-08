import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius, spacing } from '../theme/colors';

export default function StatusBadge({ label, color }) {
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  label: { fontSize: 13, fontWeight: '700', letterSpacing: 0.4 },
});
