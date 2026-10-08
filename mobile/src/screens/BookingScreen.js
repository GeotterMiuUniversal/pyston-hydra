import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radius } from '../theme/colors';
import { CONFIG, SERVICES } from '../config/constants';

export default function BookingScreen({ route }) {
  const mode = route?.params?.mode || 'cita';
  const [selectedService, setSelectedService] = useState(null);
  const [model, setModel] = useState('');
  const [date, setDate] = useState('');

  const isGrua = mode === 'grua';

  const confirm = () => {
    const service = isGrua
      ? 'Grúa / Auxilio Mecánico'
      : selectedService?.name || 'una revisión general';
    const message = isGrua
      ? `Hola ${CONFIG.BUSINESS_NAME}, necesito el servicio de Grúa / Auxilio Mecánico en ${CONFIG.CITY}. Moto: ${model || '[Modelo/Año]'}. Ubicación: [Indicar dirección].`
      : `Hola ${CONFIG.BUSINESS_NAME}, quisiera agendar cita para ${service}. Moto: ${model || '[Modelo/Año]'}. Fecha preferida: ${date || '[Indicar fecha]'}.`;
    Linking.openURL(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{isGrua ? 'Grúa / Auxilio Mecánico' : 'Agendar Cita'}</Text>
        <Text style={styles.subtitle}>
          {isGrua
            ? 'Asistencia vial en Barquisimeto. Indicanos tu ubicación y llevamos tu moto al taller.'
            : 'Reserva tu espacio en el taller. Confirmación por WhatsApp en minutos.'}
        </Text>

        <Text style={styles.label}>Modelo / Año de tu moto</Text>
        <TextInput
          style={styles.input}
          value={model}
          onChangeText={setModel}
          placeholder="Ej. Honda CB650R 2022"
          placeholderTextColor={colors.textDim}
        />

        {!isGrua && (
          <>
            <Text style={styles.label}>Servicio de interés</Text>
            <View style={styles.chips}>
              {SERVICES.map((s) => (
                <Text
                  key={s.id}
                  style={[styles.chip, selectedService?.id === s.id && styles.chipActive]}
                  onPress={() => setSelectedService(s)}
                >
                  {s.name}
                </Text>
              ))}
            </View>

            <Text style={styles.label}>Fecha preferida</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="Ej. Viernes 10:00 AM"
              placeholderTextColor={colors.textDim}
            />
          </>
        )}

        {isGrua && (
          <>
            <Text style={styles.label}>Tu ubicación actual</Text>
            <TextInput
              style={styles.input}
              value={model}
              onChangeText={setModel}
              placeholder="Dirección o punto de referencia en Barquisimeto"
              placeholderTextColor={colors.textDim}
            />
          </>
        )}

        <PrimaryButton
          title={isGrua ? 'Solicitar Grúa por WhatsApp' : 'Confirmar Cita por WhatsApp'}
          onPress={confirm}
          style={styles.confirm}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.carbon950 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 4, marginBottom: spacing.lg, lineHeight: 19 },
  label: { color: colors.gold, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: spacing.md },
  input: {
    backgroundColor: colors.carbon800,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    color: colors.textDim,
    fontSize: 13,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: { color: '#17130a', backgroundColor: colors.gold, borderColor: colors.gold },
  confirm: { marginTop: spacing.xl },
});
