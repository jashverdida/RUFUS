import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function StatCard({ title, value, subtitle, accentColor }) {
  return (
    <View style={[styles.card, { borderTopColor: accentColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    borderTopWidth: 3,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});
