import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import ServiceCard from '../components/ServiceCard';
import { colors, spacing } from '../theme/colors';
import { CONFIG, SERVICES } from '../config/constants';

export default function HomeScreen({ navigation }) {
  const openWhatsApp = (serviceName) => {
    const message = `Hola ${CONFIG.BUSINESS_NAME}, me interesa el servicio de ${serviceName} para mi moto [Modelo/Año]. Quisiera agendar una revisión en su taller de ${CONFIG.CITY}.`;
    Linking.openURL(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Barquisimeto · Estado Lara</Text>
          <Text style={styles.title}>Ingeniería, Evolución y Rendimiento</Text>
          <Text style={styles.subtitle}>
            Tu taller de alta gama. Agenda, consulta repuestos y rastrea tu reparación desde un solo lugar.
          </Text>
          <PrimaryButton title="Agendar Cita por WhatsApp" onPress={() => openWhatsApp('una revisión general')} />
        </View>

        <Text style={styles.sectionTitle}>Servicios &amp; Tarifas</Text>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} onRequest={openWhatsApp} />
        ))}

        <View style={styles.quickActions}>
          <PrimaryButton
            title="Rastrear Reparación"
            variant="ghost"
            onPress={() => navigation.navigate('Tracking')}
            style={styles.quickBtn}
          />
          <PrimaryButton
            title="Pedir Grúa / Auxilio"
            variant="ghost"
            onPress={() => navigation.navigate('Booking', { mode: 'grua' })}
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
  sectionTitle: { color: colors.gold, fontSize: 18, fontWeight: '800', marginBottom: spacing.md, marginTop: spacing.md },
  quickActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  quickBtn: { flex: 1 },
});
