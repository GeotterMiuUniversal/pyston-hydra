import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Text style={styles.clear} onPress={() => onChangeText('')}>✕</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.carbon800,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  icon: { color: colors.gold, fontSize: 20, marginRight: spacing.sm },
  input: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 12 },
  clear: { color: colors.textDim, fontSize: 16, paddingLeft: spacing.sm },
});
