import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusColors } from '../constants/colors';

export default function StatusBadge({ status }) {
  const { bg, text } = getStatusColors(status);
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
