import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius } from '../theme/colors';

export default function PrimaryButton({ title, onPress, variant = 'gold', loading = false, style }) {
  const isGold = variant === 'gold';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
      style={[
        styles.btn,
        isGold ? styles.gold : styles.ghost,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGold ? '#17130a' : colors.gold} />
      ) : (
        <Text style={[styles.text, isGold ? styles.textGold : styles.textGhost]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  gold: {
    backgroundColor: colors.gold,
    shadowColor: colors.gold,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ghost: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.line,
  },
  text: { fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  textGold: { color: '#17130a' },
  textGhost: { color: colors.text },
});
