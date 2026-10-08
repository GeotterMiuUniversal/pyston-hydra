import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import useCatalog from '../hooks/useCatalog';
import { whatsAppLink, messages } from '../services/catalogApi';
import { colors, spacing, radius } from '../theme/colors';

export default function BookingScreen({ route }) {
  const mode = route?.params?.mode || 'cita';
  const { catalog } = useCatalog();
  const servicios = catalog?.servicios || [];
  const grua = catalog?.grua;

  const [selectedId, setSelectedId] = useState(null);
  const [modelo, setModelo] = useState('');
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');

  const isGrua = mode === 'grua';
  const selected = servicios.find((s) => s.id === selectedId);

  const confirmar = () => {
    const url = isGrua
      ? whatsAppLink((n) => messages.grua(n, direccion, modelo), catalog)
      : whatsAppLink((n) => messages.cita(n, selected?.name || 'una revisión general', modelo, fecha), catalog);
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{isGrua ? 'Grúa / Auxilio Mecánico' : 'Agendar Cita'}</Text>
        <Text style={styles.subtitle}>
          {isGrua
            ? `${grua?.zona || 'Barquisimeto'} · Disponible ${grua?.horario || '24 horas'}.`
            : 'Reserva tu espacio en el taller. Confirmación por WhatsApp en minutos.'}
        </Text>

        <Text style={styles.label}>Modelo / Año de tu moto</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholder="Ej. Honda CB650R 2022"
          placeholderTextColor={colors.textDim}
        />

        {isGrua ? (
          <>
            <Text style={styles.label}>Tu ubicación actual</Text>
            <TextInput
              style={styles.input}
              value={direccion}
              onChangeText={setDireccion}
              placeholder="Dirección o punto de referencia"
              placeholderTextColor={colors.textDim}
            />
            <Text style={styles.note}>
              Tarifa: {grua?.precio?.texto || 'Consultar según distancia'}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Servicio de interés</Text>
            <View style={styles.chips}>
              {servicios.map((s) => (
                <Text
                  key={s.id}
                  style={[styles.chip, selectedId === s.id && styles.chipActive]}
                  onPress={() => setSelectedId(s.id)}
                >
                  {s.name} · {s.price}
                </Text>
              ))}
            </View>

            <Text style={styles.label}>Fecha preferida</Text>
            <TextInput
              style={styles.input}
              value={fecha}
              onChangeText={setFecha}
              placeholder="Ej. Viernes 10:00 AM"
              placeholderTextColor={colors.textDim}
            />
          </>
        )}

        <PrimaryButton
          title={isGrua ? 'Solicitar Grúa por WhatsApp' : 'Confirmar Cita por WhatsApp'}
          onPress={confirmar}
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
  note: { color: colors.goldLight, fontSize: 13, marginTop: spacing.md },
  confirm: { marginTop: spacing.xl },
});