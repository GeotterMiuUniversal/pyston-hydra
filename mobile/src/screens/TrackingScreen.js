import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBadge from '../components/StatusBadge';
import { colors, spacing, radius } from '../theme/colors';
import { REPAIR_STATUS } from '../config/constants';

const MOCK_ORDERS = [
  {
    id: 'PH-2026-0142',
    bike: 'Honda CB650R 2022',
    status: REPAIR_STATUS.IN_REPAIR,
    updated: 'Hace 2 horas',
    detail: 'Rectificado de cilindro en progreso. Entrega estimada: viernes.',
  },
  {
    id: 'PH-2026-0138',
    bike: 'Yamaha MT-07 2020',
    status: REPAIR_STATUS.WAITING_PARTS,
    updated: 'Ayer',
    detail: 'Esperando pastillas de freno ABS. Llegada estimada: mañana.',
  },
  {
    id: 'PH-2026-0129',
    bike: 'Honda CB650R 2022',
    status: REPAIR_STATUS.READY,
    updated: 'Hace 3 días',
    detail: 'Mantenimiento completado. Listo para retirar en el taller.',
  },
];

const STATUS_FLOW = [
  REPAIR_STATUS.DIAGNOSIS,
  REPAIR_STATUS.WAITING_PARTS,
  REPAIR_STATUS.IN_REPAIR,
  REPAIR_STATUS.READY,
];

export default function TrackingScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Rastreo de Reparación</Text>
        <Text style={styles.subtitle}>Estatus en tiempo real de tu moto en el taller.</Text>

        <View style={styles.flow}>
          {STATUS_FLOW.map((s, i) => (
            <View key={s.key} style={styles.flowItem}>
              <View style={[styles.flowDot, { borderColor: s.color }]}>
                <View style={[styles.flowDotInner, { backgroundColor: s.color }]} />
              </View>
              <Text style={[styles.flowLabel, { color: s.color }]}>{s.label}</Text>
              {i < STATUS_FLOW.length - 1 && <View style={styles.flowLine} />}
            </View>
          ))}
        </View>

        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderBike}>{order.bike}</Text>
              </View>
              <StatusBadge label={order.status.label} color={order.status.color} />
            </View>
            <Text style={styles.orderDetail}>{order.detail}</Text>
            <Text style={styles.orderUpdated}>Actualizado {order.updated}</Text>
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
  flow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  flowItem: { alignItems: 'center', flex: 1 },
  flowDot: {
    width: 22, height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowDotInner: { width: 8, height: 8, borderRadius: 4 },
  flowLabel: { fontSize: 10, fontWeight: '700', marginTop: 6, textAlign: 'center' },
  flowLine: { position: 'absolute', top: 11, left: '50%', right: '-50%', height: 2, backgroundColor: colors.carbon600, zIndex: -1 },
  card: {
    backgroundColor: colors.carbon800,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  orderId: { color: colors.gold, fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  orderBike: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 2 },
  orderDetail: { color: colors.textDim, fontSize: 13, lineHeight: 19 },
  orderUpdated: { color: colors.textDim, fontSize: 11, marginTop: 8, opacity: 0.7 },
});
