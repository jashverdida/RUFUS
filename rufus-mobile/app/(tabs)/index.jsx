import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../../components/StatCard';
import QueueItem from '../../components/QueueItem';
import { mockApplications } from '../../data/mockApplications';
import { Colors } from '../../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(amount);

const LEDGER_DATA = [
  { date: '2026-04-01', or: 'OR-001', payment: 5200, cbu: 500, loanBal: 344800, savingsBal: 1500, staff: 'JD' },
  { date: '2026-04-05', or: 'OR-002', payment: 3800, cbu: 300, loanBal: 341000, savingsBal: 1800, staff: 'JD' },
  { date: '2026-04-10', or: 'OR-003', payment: 6100, cbu: 600, loanBal: 334900, savingsBal: 2400, staff: 'MR' },
  { date: '2026-04-15', or: 'OR-004', payment: 4500, cbu: 400, loanBal: 330400, savingsBal: 2800, staff: 'JD' },
  { date: '2026-04-20', or: 'OR-005', payment: 5800, cbu: 500, loanBal: 324600, savingsBal: 3300, staff: 'MR' },
  { date: '2026-04-25', or: 'OR-006', payment: 4200, cbu: 350, loanBal: 320400, savingsBal: 3650, staff: 'JD' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [showLedger, setShowLedger] = useState(false);

  const queueSize = mockApplications.length;
  const approvedToday = mockApplications.filter((a) => a.aiStatus === 'Pre-Approved').length;
  const needsReview = mockApplications.filter(
    (a) => a.aiStatus === 'Review Needed' || a.aiStatus === 'Needs Manual Review'
  ).length;

  const totalPayments = LEDGER_DATA.reduce((s, r) => s + r.payment, 0);
  const totalCbu = LEDGER_DATA.reduce((s, r) => s + r.cbu, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Stat Cards */}
        <View style={styles.statsRow}>
          <StatCard title="Queue Size" value={queueSize} subtitle="+2 since yesterday" accentColor={Colors.accent} />
          <StatCard title="Approved Today" value={approvedToday} subtitle="50% approval rate" accentColor={Colors.success} />
          <StatCard title="Needs Review" value={needsReview} subtitle="Awaiting assessment" accentColor={Colors.warning} />
        </View>

        {/* Underwriting Queue */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Underwriting Queue</Text>
          <Text style={styles.sectionSub}>{mockApplications.length} applications pending review</Text>
        </View>
        {mockApplications.map((item) => (
          <QueueItem key={item.id} item={item} onPress={(i) => router.push(`/detail/${i.id}`)} />
        ))}

        {/* Digital Ledger */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Digital Ledger</Text>
          <TouchableOpacity onPress={() => setShowLedger(true)} style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Ledger Preview (last 3) — horizontal scroll for all columns */}
        <View style={styles.ledgerCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ minWidth: 620 }}>
              <View style={styles.ledgerHeader}>
                {['Date', 'OR Number', 'Loan Payment', 'CBU (Savings)', 'Running Loan Bal.', 'Running Savings Bal.', 'Staff'].map((h) => (
                  <Text key={h} style={styles.ledgerCol}>{h}</Text>
                ))}
              </View>
              {LEDGER_DATA.slice(-3).map((row) => (
                <View key={row.or} style={styles.ledgerRow}>
                  <Text style={styles.ledgerCell}>{row.date.slice(5)}</Text>
                  <Text style={styles.ledgerCell}>{row.or}</Text>
                  <Text style={[styles.ledgerCell, { color: Colors.textPrimary, fontWeight: '700' }]}>{formatPhp(row.payment)}</Text>
                  <Text style={[styles.ledgerCell, { color: Colors.textPrimary, fontWeight: '700' }]}>{formatPhp(row.cbu)}</Text>
                  <Text style={[styles.ledgerCell, { color: Colors.primary, fontWeight: '700' }]}>{formatPhp(row.loanBal)}</Text>
                  <Text style={[styles.ledgerCell, { color: Colors.accent, fontWeight: '700' }]}>{formatPhp(row.savingsBal)}</Text>
                  <View style={styles.staffBadge}><Text style={styles.staffText}>{row.staff}</Text></View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

      </ScrollView>

      {/* Digital Ledger Full Modal */}
      <Modal visible={showLedger} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <SafeAreaView style={styles.modalContainer} edges={['top', 'bottom']}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Digital Ledger</Text>
                <Text style={styles.modalSub}>Complete Transaction History</Text>
              </View>
              <TouchableOpacity onPress={() => setShowLedger(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.ledgerCard}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ minWidth: 680 }}>
                    <View style={styles.ledgerHeaderFull}>
                      {['Date', 'OR Number', 'Loan Payment', 'CBU (Savings)', 'Running Loan Bal.', 'Running Savings Bal.', 'Staff'].map((h) => (
                        <Text key={h} style={styles.ledgerColFull}>{h}</Text>
                      ))}
                    </View>
                    {LEDGER_DATA.map((row) => (
                      <View key={row.or} style={styles.ledgerRowFull}>
                        <Text style={styles.ledgerCellFull}>{row.date}</Text>
                        <Text style={styles.ledgerCellFull}>{row.or}</Text>
                        <Text style={[styles.ledgerCellFull, { color: Colors.textPrimary, fontWeight: '700' }]}>{formatPhp(row.payment)}</Text>
                        <Text style={[styles.ledgerCellFull, { color: Colors.textPrimary, fontWeight: '700' }]}>{formatPhp(row.cbu)}</Text>
                        <Text style={[styles.ledgerCellFull, { color: Colors.primary, fontWeight: '700' }]}>{formatPhp(row.loanBal)}</Text>
                        <Text style={[styles.ledgerCellFull, { color: Colors.accent, fontWeight: '700' }]}>{formatPhp(row.savingsBal)}</Text>
                        <View style={styles.staffBadge}><Text style={styles.staffText}>{row.staff}</Text></View>
                      </View>
                    ))}
                    {/* Totals */}
                    <View style={[styles.ledgerRowFull, styles.totalRow]}>
                      <Text style={[styles.ledgerCellFull, { fontWeight: '800', color: Colors.textPrimary }]}>TOTAL</Text>
                      <Text style={styles.ledgerCellFull} />
                      <Text style={[styles.ledgerCellFull, { fontWeight: '800', color: Colors.textPrimary }]}>{formatPhp(totalPayments)}</Text>
                      <Text style={[styles.ledgerCellFull, { fontWeight: '800', color: Colors.textPrimary }]}>{formatPhp(totalCbu)}</Text>
                      <Text style={styles.ledgerCellFull} />
                      <Text style={styles.ledgerCellFull} />
                      <Text style={styles.ledgerCellFull} />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundSecondary },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  statsRow: { flexDirection: 'row', marginBottom: 20 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  sectionSub: { fontSize: 12, color: Colors.textSecondary },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewAllText: { fontSize: 13, color: Colors.primaryLight, fontWeight: '600' },

  ledgerCard: {
    backgroundColor: Colors.background, borderRadius: 12, overflow: 'hidden', marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  ledgerHeader: {
    flexDirection: 'row', backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  ledgerCol: { width: 88, fontSize: 9, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase' },
  ledgerRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  ledgerCell: { width: 88, fontSize: 12, color: Colors.textPrimary },
  staffBadge: {
    width: 88, alignItems: 'flex-start',
  },
  staffText: {
    backgroundColor: Colors.backgroundSecondary, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 2,
    fontSize: 11, fontWeight: '700', color: Colors.textSecondary,
  },

  modalBg: { flex: 1, backgroundColor: 'rgba(10, 30, 80, 0.4)' },
  modalContainer: { flex: 1, backgroundColor: Colors.background, marginTop: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  modalSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  closeBtn: { padding: 4 },
  modalContent: { padding: 16, paddingBottom: 32 },

  ledgerHeaderFull: {
    flexDirection: 'row', backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  ledgerColFull: { width: 100, fontSize: 9, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase' },
  ledgerRowFull: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  ledgerCellFull: { width: 100, fontSize: 12, color: Colors.textPrimary },
  totalRow: { backgroundColor: Colors.backgroundTertiary, borderTopWidth: 2, borderTopColor: Colors.borderLight },
});
