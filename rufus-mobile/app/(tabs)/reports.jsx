import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trending-up-outline" size={32} color={Colors.primary} />
            <View style={styles.headerText}>
              <Text style={styles.title}>Reports</Text>
              <Text style={styles.subtitle}>System analytics and underwriting metrics</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.inDevBadge}>
            <Ionicons name="construct-outline" size={14} color={Colors.yellow} />
            <Text style={styles.inDevText}>In Development</Text>
          </View>
          <Text style={styles.body}>
            Advanced analytics and performance dashboards will be available soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.slate50 },
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  headerText: { flex: 1 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.slate800 },
  subtitle: { fontSize: 13, color: Colors.slate600, marginTop: 2 },
  divider: {
    height: 1,
    backgroundColor: Colors.slate100,
    marginVertical: 16,
  },
  inDevBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.yellowLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 12,
  },
  inDevText: { fontSize: 12, fontWeight: '700', color: Colors.yellow },
  body: { fontSize: 14, color: Colors.slate600, lineHeight: 22 },
});
