import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import useCatalog from '../hooks/useCatalog';
import { whatsAppLink, messages } from '../services/catalogApi';
import { colors, spacing, radius } from '../theme/colors';

export default function PartsCatalogScreen() {
  const { catalog } = useCatalog();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const repuestos = catalog?.repuestos || [];
  const categorias = catalog?.categorias || [];

  const filtered = repuestos.filter((p) => {
    const matchesText = !query || `${p.name} ${p.brand} ${p.models}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || p.category === category;
    return matchesText && matchesCategory;
  });

  const pedir = (part) =>
    Linking.openURL(whatsAppLink((n) => messages.repuesto(n, part), catalog));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Catálogo de Repuestos</Text>
        <Text style={styles.subtitle}>Busca por nombre, marca o modelo de moto.</Text>

        <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar repuesto o modelo…" />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          <Text style={[styles.catChip, !category && styles.catChipActive]} onPress={() => setCategory(null)}>
            Todas
          </Text>
          {categorias.map((c) => (
            <Text
              key={c.id}
              style={[styles.catChip, category === c.id && styles.catChipActive]}
              onPress={() => setCategory(category === c.id ? null : c.id)}
            >
              {c.nombre}
            </Text>
          ))}
        </ScrollView>

        {filtered.length === 0 && (
          <Text style={styles.empty}>Sin resultados. Escríbenos y lo conseguimos.</Text>
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
            <View style={styles.cardFoot}>
              <Text style={[styles.stock, !part.inStock && styles.stockOut]}>
                {part.inStock ? 'En stock' : 'Bajo pedido'}
              </Text>
              <Text style={styles.partCta} onPress={() => pedir(part)}>Pedir por WhatsApp →</Text>
            </View>
          </View>
        ))}

        <Text style={styles.source}>Precios sincronizados desde {catalog?.source || '...'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.carbon950 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 4, marginBottom: spacing.md },
  catScroll: { marginBottom: spacing.md },
  catChip: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
  },
  catChipActive: { color: '#17130a', backgroundColor: colors.gold, borderColor: colors.gold },
  empty: { color: colors.textDim, fontSize: 14, textAlign: 'center', paddingVertical: spacing.xl },
  card: {
    backgroundColor: colors.carbon800,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  partName: { color: colors.text, fontSize: 15, fontWeight: '700' },
  partMeta: { color: colors.textDim, fontSize: 12, marginTop: 2 },
  partPrice: { color: colors.gold, fontSize: 15, fontWeight: '800' },
  cardFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  stock: { color: colors.success, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  stockOut: { color: colors.gold },
  partCta: { color: colors.goldLight, fontSize: 13, fontWeight: '700' },
  source: { color: colors.textDim, fontSize: 10, textAlign: 'center', marginTop: spacing.lg, opacity: 0.7 },
});