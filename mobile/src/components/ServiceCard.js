import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

export default function ServiceCard({ service, onRequest }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.price}>{service.price}</Text>
      </View>
      <Text style={styles.desc}>{service.description}</Text>
      <Text style={styles.cta} onPress={() => onRequest(service)}>
        Solicitar por WhatsApp →
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.carbon800,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  name: { color: colors.text, fontSize: 16, fontWeight: '700', flex: 1 },
  price: { color: colors.gold, fontSize: 15, fontWeight: '800' },
  desc: { color: colors.textDim, fontSize: 13, lineHeight: 19, marginBottom: spacing.md },
  cta: { color: colors.goldLight, fontSize: 13, fontWeight: '700' },
});
