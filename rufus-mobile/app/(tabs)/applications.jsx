import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import StatusBadge from '../../components/StatusBadge';
import { mockApplications } from '../../data/mockApplications';
import { Colors } from '../../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(amount);

const DocBadge = ({ label, done }) => (
  <View style={[styles.docBadge, { backgroundColor: done ? Colors.greenLight : Colors.slate100 }]}>
    <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={12} color={done ? Colors.green : Colors.slate400} />
    <Text style={[styles.docLabel, { color: done ? Colors.green : Colors.slate400 }]}>{label}</Text>
  </View>
);

export default function ApplicationsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Pre-Approved', 'Review Needed', 'Pending', 'Declined'];

  const filtered = mockApplications.filter((a) => {
    const matchSearch = a.businessName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.aiStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = mockApplications.length;
  const pending = mockApplications.filter((a) => a.aiStatus === 'Pending').length;
  const approved = mockApplications.filter((a) => a.aiStatus === 'Pre-Approved').length;
  const declined = mockApplications.filter((a) => a.aiStatus === 'Declined').length;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Total', value: total, color: Colors.primary },
            { label: 'Pending', value: pending, color: Colors.amber },
            { label: 'Approved', value: approved, color: Colors.green },
            { label: 'Declined', value: declined, color: Colors.red },
          ].map((s) => (
            <View key={s.label} style={[styles.statCard, { borderTopColor: s.color }]}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color={Colors.slate400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search business name..."
            placeholderTextColor={Colors.slate400}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Status Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {statuses.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setStatusFilter(s)}
              style={[styles.filterChip, statusFilter === s && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, statusFilter === s && styles.filterChipTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Application Cards */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="document-outline" size={40} color={Colors.slate300} />
            <Text style={styles.emptyText}>No applications found</Text>
          </View>
        ) : (
          filtered.map((app) => (
            <TouchableOpacity
              key={app.id}
              style={styles.appCard}
              onPress={() => router.push(`/detail/${app.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.appCardTop}>
                <View style={styles.appCardLeft}>
                  <Text style={styles.appBusinessName}>{app.businessName}</Text>
                  <Text style={styles.appCategory}>{app.businessType}</Text>
                </View>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreText}>{app.rufusScore}</Text>
                </View>
              </View>

              <View style={styles.appCardMid}>
                <Text style={styles.appAmount}>{formatPhp(app.requestedLoanAmount)}</Text>
                <Text style={styles.appDate}>Submitted: {app.submitted}</Text>
              </View>

              {/* Document Status */}
              <View style={styles.docRow}>
                <DocBadge label="Plan" done={app.docs.plan} />
                <DocBadge label="Financial" done={app.docs.financial} />
                <DocBadge label="History" done={app.docs.history} />
              </View>

              <View style={styles.appCardBottom}>
                <StatusBadge status={app.aiStatus} />
                <Ionicons name="chevron-forward" size={18} color={Colors.slate400} />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.slate50 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: 10,
    padding: 10, borderTopWidth: 3, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 10, color: Colors.slate500, marginTop: 2, fontWeight: '600' },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: Colors.slate200, marginBottom: 10,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: Colors.slate900 },

  filterRow: { marginBottom: 14 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.slate200,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.slate600 },
  filterChipTextActive: { color: Colors.white },

  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 14, color: Colors.slate400, marginTop: 8 },

  appCard: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  appCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  appCardLeft: { flex: 1, marginRight: 8 },
  appBusinessName: { fontSize: 15, fontWeight: '700', color: Colors.slate900 },
  appCategory: { fontSize: 12, color: Colors.slate500, marginTop: 2 },
  scoreCircle: {
    width: 42, height: 42, borderRadius: 21,
    borderWidth: 3, borderColor: Colors.cyan,
    alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.cyanLight,
  },
  scoreText: { fontSize: 13, fontWeight: '800', color: Colors.primary },

  appCardMid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  appAmount: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  appDate: { fontSize: 11, color: Colors.slate400 },

  docRow: { flexDirection: 'row', gap: 6, marginBottom: 10 },
  docBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999,
  },
  docLabel: { fontSize: 10, fontWeight: '600' },

  appCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
