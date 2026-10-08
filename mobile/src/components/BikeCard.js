import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

export default function BikeCard({ bike, onPress }) {
  return (
    <View style={styles.card} onTouchEnd={onPress}>
      <View style={styles.row}>
        <View>
          <Text style={styles.model}>{bike.model}</Text>
          <Text style={styles.year}>{bike.year} · {bike.plate}</Text>
        </View>
        <Text style={styles.mileage}>{bike.mileage} km</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.nextLabel}>Próxima revisión</Text>
        <Text style={styles.nextValue}>{bike.nextService}</Text>
      </View>
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  model: { color: colors.text, fontSize: 16, fontWeight: '700' },
  year: { color: colors.textDim, fontSize: 12, marginTop: 2 },
  mileage: { color: colors.gold, fontSize: 14, fontWeight: '800' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginVertical: spacing.sm },
  nextLabel: { color: colors.textDim, fontSize: 12 },
  nextValue: { color: colors.goldLight, fontSize: 13, fontWeight: '700' },
});
