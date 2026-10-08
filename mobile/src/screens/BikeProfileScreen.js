import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BikeCard from '../components/BikeCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing } from '../theme/colors';

const MOCK_BIKES = [
  { id: 1, model: 'Honda CB650R', year: 2022, plate: 'ABC123', mileage: 18450, nextService: '10,000 km · Aceite + Filtro' },
  { id: 2, model: 'Yamaha MT-07', year: 2020, plate: 'XYZ789', mileage: 32100, nextService: '35,000 km · Revisión completa' },
];

const MOCK_HISTORY = [
  { date: '12 Sep 2026', service: 'Cambio de aceite sintético + filtro', cost: '$22', mileage: 18450 },
  { date: '28 Jul 2026', service: 'Limpieza y calibración de inyectores', cost: '$28', mileage: 16200 },
  { date: '10 May 2026', service: 'Mantenimiento preventivo general', cost: '$45', mileage: 13800 },
];

export default function BikeProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Expediente Digital</Text>
        <Text style={styles.subtitle}>Tu moto, tu historial, siempre contigo.</Text>

        {MOCK_BIKES.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}

        <PrimaryButton title="+ Registrar Nueva Moto" variant="ghost" style={styles.addBtn} />

        <Text style={styles.sectionTitle}>Historial de Mantenimiento</Text>
        {MOCK_HISTORY.map((item, i) => (
          <View key={i} style={styles.historyCard}>
            <View style={styles.historyRow}>
              <Text style={styles.historyService}>{item.service}</Text>
              <Text style={styles.historyCost}>{item.cost}</Text>
            </View>
            <Text style={styles.historyMeta}>{item.date} · {item.mileage.toLocaleString('es-VE')} km</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.carbon950 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 4, marginBottom: spacing.lg },
  addBtn: { marginBottom: spacing.xl },
  sectionTitle: { color: colors.gold, fontSize: 18, fontWeight: '800', marginBottom: spacing.md },
  historyCard: {
    backgroundColor: colors.carbon800,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  historyService: { color: colors.text, fontSize: 14, fontWeight: '600', flex: 1, marginRight: spacing.sm },
  historyCost: { color: colors.gold, fontSize: 14, fontWeight: '800' },
  historyMeta: { color: colors.textDim, fontSize: 12 },
});
