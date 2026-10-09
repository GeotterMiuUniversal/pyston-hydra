import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import ServiceCard from '../components/ServiceCard';
import useCatalog from '../hooks/useCatalog';
import { whatsAppLink, messages } from '../services/catalogApi';
import { colors, spacing } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { catalog, loading, refresh } = useCatalog();
  const servicios = catalog?.servicios || [];
  const negocio = catalog?.negocio;

  const openWhatsApp = (service) =>
    Linking.openURL(whatsAppLink((n) => messages.servicio(n, service.name), catalog));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading && !!catalog} onRefresh={refresh} tintColor={colors.gold} />}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{negocio?.ciudad || 'Barquisimeto'} · {negocio?.estado || 'Estado Lara'}</Text>
          <Text style={styles.title}>{negocio?.lema || 'Ingeniería, Evolución y Rendimiento'}</Text>
          <Text style={styles.subtitle}>
            Tu taller de alta gama. Agenda, consulta repuestos y rastrea tu reparación desde un solo lugar.
          </Text>
          <PrimaryButton
            title="Agendar Cita por WhatsApp"
            onPress={() => Linking.openURL(whatsAppLink(messages.general, catalog))}
          />
          <Text style={styles.source}>Precios: {catalog?.source || 'cargando…'}{catalog?.offline ? ' (sin conexión)' : ''}</Text>
        </View>

        <Text style={styles.sectionTitle}>Servicios &amp; Tarifas</Text>
        {servicios.map((service) => (
          <ServiceCard key={service.id} service={service} onRequest={openWhatsApp} />
        ))}

        <View style={styles.quickActions}>
          <PrimaryButton
            title="Rastrear Reparación"
            variant="ghost"
            onPress={() => navigation.navigate('Rastreo')}
            style={styles.quickBtn}
          />
          <PrimaryButton
            title="Pedir Grúa"
            variant="ghost"
            onPress={() => navigation.navigate('Citas', { mode: 'grua' })}
            style={styles.quickBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.carbon950 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  hero: { alignItems: 'center', paddingVertical: spacing.xl, textAlign: 'center' },
  eyebrow: {
    color: colors.gold, fontSize: 11, fontWeight: '700',
    letterSpacing: 2.4, textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  title: {
    color: colors.text, fontSize: 26, fontWeight: '800',
    textAlign: 'center', lineHeight: 32, marginBottom: spacing.sm,
  },
  subtitle: { color: colors.textDim, fontSize: 14, textAlign: 'center', marginBottom: spacing.lg, paddingHorizontal: spacing.md },
  source: { color: colors.textDim, fontSize: 10, marginTop: spacing.md, opacity: 0.7, letterSpacing: 0.6 },
  sectionTitle: { color: colors.gold, fontSize: 18, fontWeight: '800', marginBottom: spacing.md, marginTop: spacing.md },
  quickActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  quickBtn: { flex: 1 },
});