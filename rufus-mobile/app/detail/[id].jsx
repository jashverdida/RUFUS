import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScoreCircle from '../../components/ScoreCircle';
import StatusBadge from '../../components/StatusBadge';
import { mockApplications } from '../../data/mockApplications';
import { Colors } from '../../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount);

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const app = mockApplications.find((a) => a.id === id);

  if (!app) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Application not found.</Text>
      </View>
    );
  }

  const handleAction = (action) => {
    Alert.alert(
      action,
      `Are you sure you want to ${action.toLowerCase()} this application for ${app.businessName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () =>
            Alert.alert('Done', `${action} has been recorded successfully.`),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
          <Text style={styles.backText}>Queue</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Application Detail
        </Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.scrollBg} contentContainerStyle={styles.content}>
        {/* Business Identity */}
        <View style={styles.identityCard}>
          <Text style={styles.businessName}>{app.businessName}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{app.ownerName}</Text>
            <Text style={styles.metaDot}> · </Text>
            <Text style={styles.metaText}>{app.businessType}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaId}>{app.id}</Text>
            <Text style={styles.metaDot}> · </Text>
            <Text style={styles.metaId}>{app.yearsInOperation} yrs in operation</Text>
          </View>
          <View style={styles.loanRow}>
            <Text style={styles.loanLabel}>Loan Request: </Text>
            <Text style={styles.loanAmount}>{formatPhp(app.requestedLoanAmount)}</Text>
          </View>
        </View>

        {/* Score + Status */}
        <View style={styles.scoreCard}>
          <ScoreCircle score={app.rufusScore} />
          <View style={styles.statusBlock}>
            <Text style={styles.statusLabel}>AI Status</Text>
            <StatusBadge status={app.aiStatus} />
          </View>
        </View>

        {/* AI Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  AI Summary</Text>
          </View>
          <Text style={styles.summaryText}>{app.aiSummary}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Colors.primary }]}
            onPress={() => handleAction('Approve')}
          >
            <Text style={[styles.actionBtnText, { color: Colors.white }]}>
              Approve
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.outlineBtn]}
            onPress={() => handleAction('Request Review')}
          >
            <Text style={[styles.actionBtnText, { color: Colors.slate700 }]}>
              Request Review
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.outlineBtn]}
            onPress={() => handleAction('Decline')}
          >
            <Text style={[styles.actionBtnText, { color: Colors.red }]}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>

        {/* Digitized Financials */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="bar-chart-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  Digitized Financials</Text>
          </View>
          {Object.entries(app.financials).map(([key, value], index, arr) => (
            <View
              key={key}
              style={[
                styles.finRow,
                index < arr.length - 1 && styles.finRowBorder,
              ]}
            >
              <Text style={styles.finLabel}>{key}</Text>
              <Text style={styles.finValue}>{value}</Text>
            </View>
          ))}
          <Text style={styles.finNote}>
            Data extracted from uploaded documents via AI document parsing
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { color: Colors.slate600, fontSize: 16 },

  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, width: 80 },
  backText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
  headerTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },

  scrollBg: { backgroundColor: Colors.slate50 },
  content: { padding: 16, paddingBottom: 40 },

  identityCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.slate900,
    marginBottom: 6,
  },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 },
  metaText: { fontSize: 13, color: Colors.slate600 },
  metaDot: { fontSize: 13, color: Colors.slate400 },
  metaId: { fontSize: 12, color: Colors.slate500 },
  loanRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  loanLabel: { fontSize: 13, color: Colors.slate600, fontWeight: '600' },
  loanAmount: { fontSize: 16, color: Colors.primary, fontWeight: '800' },

  scoreCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statusBlock: { flex: 1, paddingLeft: 16 },
  statusLabel: {
    fontSize: 12,
    color: Colors.slate500,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.slate900,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.slate700,
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: Colors.slate200,
    backgroundColor: Colors.white,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },

  finRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  finRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.slate100,
  },
  finLabel: {
    fontSize: 13,
    color: Colors.slate600,
    flex: 1,
  },
  finValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.slate900,
  },
  finNote: {
    fontSize: 11,
    color: Colors.slate400,
    fontStyle: 'italic',
    marginTop: 10,
  },
});
