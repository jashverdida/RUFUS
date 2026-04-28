import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from './StatusBadge';
import { Colors } from '../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount);

export default function QueueItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item)} activeOpacity={0.7}>
      <View style={styles.left}>
        <Text style={styles.businessName}>{item.businessName}</Text>
        <Text style={styles.businessType}>{item.businessType}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.amount}>{formatPhp(item.requestedLoanAmount)}</Text>
          {item.rufusScore > 0 && (
            <Text style={styles.score}>  ·  Score: {item.rufusScore}</Text>
          )}
        </View>
        <View style={{ marginTop: 8 }}>
          <StatusBadge status={item.aiStatus} />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.slate400} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  left: { flex: 1, marginRight: 8 },
  businessName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.slate900,
    marginBottom: 2,
  },
  businessType: {
    fontSize: 12,
    color: Colors.slate500,
    marginBottom: 6,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  amount: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  score: { fontSize: 12, color: Colors.slate600 },
});
