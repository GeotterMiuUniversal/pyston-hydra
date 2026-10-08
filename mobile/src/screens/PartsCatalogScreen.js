import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radius } from '../theme/colors';
import { CONFIG, PARTS_CATEGORIES } from '../config/constants';

const MOCK_PARTS = [
  { id: 1, name: 'Filtro de aire deportivo', brand: 'K&N', price: '$38', category: 'filtros', models: 'Universal' },
  { id: 2, name: 'Pastillas de freno cerámicas', brand: 'Brembo', price: '$45', category: 'frenos', models: 'Honda CB, Yamaha MT' },
  { id: 3, name: 'Aceite sintético 10W-40 (1L)', brand: 'Motul', price: '$14', category: 'aceites', models: 'Universal' },
  { id: 4, name: 'Llanta deportiva 120/70-17', brand: 'Pirelli', price: '$120', category: 'llantas', models: 'Deportivas 600cc' },
  { id: 5, name: 'Batería de litio 12V', brand: 'Shorai', price: '$95', category: 'electrico', models: 'Universal' },
  { id: 6, name: 'Kit cadena + corona', brand: 'DID', price: '$85', category: 'filtros', models: 'Honda CB650R' },
];

export default function PartsCatalogScreen() {
  const [query, setQuery] = useState('');

  const filtered = MOCK_PARTS.filter((p) =>
    `${p.name} ${p.brand} ${p.models}`.toLowerCase().includes(query.toLowerCase())
  );

  const requestPart = (part) => {
    const message = `Hola ${CONFIG.BUSINESS_NAME}, me interesa el repuesto "${part.name}" (${part.brand}) para mi moto. ¿Disponibilidad y precio final?`;
    Linking.openURL(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Catálogo de Repuestos</Text>
        <Text style={styles.subtitle}>Busca por nombre, marca o modelo de tu moto.</Text>

        <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar repuesto o modelo…" />

        {filtered.length === 0 && (
          <Text style={styles.empty}>Sin resultados para "{query}". Escríbenos y lo conseguimos.</Text>
        )}

        {filtered.map((part) => (
          <View key={part.id} style={styles.card}>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.partName}>{part.name}</Text>
                <Text style={styles.partMeta}>{part.brand} · {part.models}</Text>
              </View>
              <Text style={styles.partPrice}>{part.price}</Text>
            </View>
            <Text style={styles.partCta} onPress={() => requestPart(part)}>Solicitar por WhatsApp →</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Categorías</Text>
        <View style={styles.chips}>
          {PARTS_CATEGORIES.map((c) => (
            <View key={c.id} style={styles.categoryChip}>
              <Text style={styles.categoryName}>{c.name}</Text>
              <Text style={styles.categoryMeta}>{c.meta}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.carbon950 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 4, marginBottom: spacing.md },
  empty: { color: colors.textDim, fontSize: 14, textAlign: 'center', paddingVertical: spacing.xl },
  card: {
    backgroundColor: colors.carbon800,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  partName: { color: colors.text, fontSize: 15, fontWeight: '700' },
  partMeta: { color: colors.textDim, fontSize: 12, marginTop: 2 },
  partPrice: { color: colors.gold, fontSize: 15, fontWeight: '800' },
  partCta: { color: colors.goldLight, fontSize: 13, fontWeight: '700' },
  sectionTitle: { color: colors.gold, fontSize: 18, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    backgroundColor: colors.carbon800,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minWidth: '46%',
  },
  categoryName: { color: colors.text, fontSize: 13, fontWeight: '700' },
  categoryMeta: { color: colors.textDim, fontSize: 11, marginTop: 2 },
});
