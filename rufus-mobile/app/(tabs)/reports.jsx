import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(amount);

const KPI_DATA = [
  { label: 'Total Applications', value: '4', icon: 'document-text-outline', color: Colors.primary },
  { label: 'Avg RUFUS Score', value: '76.3', icon: 'star-outline', color: Colors.accent },
  { label: 'Pre-Approval Rate', value: '50%', icon: 'checkmark-circle-outline', color: Colors.success },
  { label: 'Avg Processing', value: '1.2 days', icon: 'time-outline', color: Colors.warning },
  { label: 'Flagged for Review', value: '2', icon: 'flag-outline', color: Colors.danger },
];

const QUEUE_DATA = [
  {
    id: 1, business: 'Mang Juan Hardware & Building Supply',
    score: 87, confidence: '94%', loan: 350000,
    action: 'Fast-Track Approve', actionColor: Colors.success, actionBg: Colors.successBg,
    priority: Colors.success,
  },
  {
    id: 2, business: "Maria's Catering & Events",
    score: 82, confidence: '91%', loan: 180000,
    action: 'Fast-Track Approve', actionColor: Colors.success, actionBg: Colors.successBg,
    priority: Colors.success,
  },
  {
    id: 3, business: 'Sarao Motors Workshop',
    score: 71, confidence: '78%', loan: 425000,
    action: 'Manual Review', actionColor: Colors.warning, actionBg: Colors.warningBg,
    priority: Colors.warning,
  },
  {
    id: 4, business: "Leny's Beauty Salon & Spa",
    score: 65, confidence: '68%', loan: 95000,
    action: 'Manual Review', actionColor: Colors.warning, actionBg: Colors.warningBg,
    priority: Colors.warning,
  },
];

const SCORE_DIST = [
  { range: '80–100', count: 2, color: Colors.success },
  { range: '70–79', count: 1, color: Colors.accent },
  { range: '60–69', count: 1, color: Colors.warning },
  { range: '50–59', count: 0, color: Colors.danger },
];

export default function ReportsScreen() {
  const fastTrack = QUEUE_DATA.filter((q) => q.action === 'Fast-Track Approve').length;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* KPI Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
          {KPI_DATA.map((k) => (
            <View key={k.label} style={[styles.kpiCard, { borderTopColor: k.color }]}>
              <Ionicons name={k.icon} size={20} color={k.color} />
              <Text style={[styles.kpiValue, { color: k.color }]}>{k.value}</Text>
              <Text style={styles.kpiLabel}>{k.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Fast-Track Callout */}
        <View style={styles.callout}>
          <Ionicons name="flash-outline" size={16} color={Colors.success} />
          <Text style={styles.calloutText}>
            {fastTrack} application{fastTrack !== 1 ? 's' : ''} eligible for fast-track approval
          </Text>
        </View>

        {/* Smart Underwriting Queue */}
        <Text style={styles.sectionTitle}>Smart Underwriting Queue</Text>
        {QUEUE_DATA.map((item) => (
          <View key={item.id} style={styles.queueCard}>
            <View style={[styles.priorityDot, { backgroundColor: item.priority }]} />
            <View style={styles.queueMain}>
              <Text style={styles.queueBusiness}>{item.business}</Text>
              <View style={styles.queueMeta}>
                <Text style={styles.queueScore}>Score: <Text style={{ color: Colors.primary, fontWeight: '700' }}>{item.score}</Text></Text>
                <Text style={styles.queueConf}>  Confidence: {item.confidence}</Text>
              </View>
              <Text style={styles.queueAmount}>{formatPhp(item.loan)}</Text>
            </View>
            <View style={styles.queueRight}>
              <View style={[styles.actionBadge, { backgroundColor: item.actionBg }]}>
                <Text style={[styles.actionText, { color: item.actionColor }]}>{item.action}</Text>
              </View>
              <View style={styles.queueBtns}>
                <TouchableOpacity
                  style={[styles.qBtn, { backgroundColor: Colors.success }]}
                  onPress={() => Alert.alert('Approved', `${item.business} approved.`)}
                >
                  <Text style={styles.qBtnText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.qBtn, { backgroundColor: Colors.warning }]}
                  onPress={() => Alert.alert('Flagged', `${item.business} flagged for review.`)}
                >
                  <Text style={styles.qBtnText}>Flag</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Score Distribution */}
        <Text style={styles.sectionTitle}>RUFUS Score Distribution</Text>
        <View style={styles.distCard}>
          {SCORE_DIST.map((d) => (
            <View key={d.range} style={styles.distRow}>
              <Text style={styles.distRange}>{d.range}</Text>
              <View style={styles.distBarBg}>
                <View
                  style={[
                    styles.distBarFill,
                    { width: `${(d.count / 4) * 100}%`, backgroundColor: d.color },
                  ]}
                />
              </View>
              <Text style={[styles.distCount, { color: d.color }]}>{d.count}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundSecondary },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  kpiScroll: { marginBottom: 14 },
  kpiCard: {
    width: 130, backgroundColor: Colors.background, borderRadius: 12,
    padding: 14, borderTopWidth: 3, marginRight: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2, alignItems: 'center',
  },
  kpiValue: { fontSize: 22, fontWeight: '800', marginTop: 6 },
  kpiLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 4, fontWeight: '600', textAlign: 'center' },

  callout: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.successBg, borderRadius: 10, padding: 12, marginBottom: 16,
  },
  calloutText: { fontSize: 13, color: Colors.success, fontWeight: '600', flex: 1 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },

  queueCard: {
    backgroundColor: Colors.background, borderRadius: 12, padding: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  priorityDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  queueMain: { flex: 1 },
  queueBusiness: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  queueMeta: { flexDirection: 'row', marginBottom: 4 },
  queueScore: { fontSize: 12, color: Colors.textSecondary },
  queueConf: { fontSize: 12, color: Colors.textSecondary },
  queueAmount: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  queueRight: { alignItems: 'flex-end', gap: 8 },
  actionBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  actionText: { fontSize: 10, fontWeight: '700' },
  queueBtns: { flexDirection: 'row', gap: 6 },
  qBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  qBtnText: { fontSize: 11, fontWeight: '700', color: Colors.background },

  distCard: {
    backgroundColor: Colors.background, borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  distRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  distRange: { width: 56, fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  distBarBg: { flex: 1, height: 10, backgroundColor: Colors.backgroundSecondary, borderRadius: 5, overflow: 'hidden', marginHorizontal: 10 },
  distBarFill: { height: 10, borderRadius: 5 },
  distCount: { width: 20, fontSize: 13, fontWeight: '800', textAlign: 'right' },
});
