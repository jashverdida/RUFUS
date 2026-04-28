import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert, TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScoreCircle from '../../components/ScoreCircle';
import StatusBadge from '../../components/StatusBadge';
import { mockApplications } from '../../data/mockApplications';
import { Colors } from '../../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(amount);

const DocRow = ({ label, done }) => (
  <View style={styles.docRow}>
    <Ionicons
      name={done ? 'checkmark-circle' : 'close-circle'}
      size={18}
      color={done ? Colors.green : Colors.red}
    />
    <Text style={[styles.docLabel, { color: done ? Colors.green : Colors.red }]}>{label}</Text>
    <Text style={[styles.docStatus, { color: done ? Colors.green : Colors.red }]}>
      {done ? 'Submitted' : 'Missing'}
    </Text>
  </View>
);

const ScoreBar = ({ label, score }) => (
  <View style={styles.scoreBarRow}>
    <Text style={styles.scoreBarLabel}>{label}</Text>
    <View style={styles.scoreBarTrack}>
      <View style={[styles.scoreBarFill, {
        width: `${score}%`,
        backgroundColor: score > 80 ? Colors.green : score >= 60 ? Colors.amber : Colors.slate300,
      }]} />
    </View>
    <Text style={styles.scoreBarNum}>{score || '—'}</Text>
  </View>
);

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const app = mockApplications.find((a) => a.id === id);
  const [notes, setNotes] = useState('');

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
        { text: 'Confirm', onPress: () => Alert.alert('Done', `${action} recorded successfully.`) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Application Detail</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView style={styles.scrollBg} contentContainerStyle={styles.content}>

        {/* Identity */}
        <View style={styles.card}>
          <Text style={styles.businessName}>{app.businessName}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="person-outline" size={13} color={Colors.slate500} />
            <Text style={styles.metaText}> {app.ownerName}</Text>
            <Text style={styles.metaDot}> · </Text>
            <Text style={styles.metaText}>{app.yearsInOperation} yrs</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={13} color={Colors.slate500} />
            <Text style={styles.metaText}> {app.address}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="call-outline" size={13} color={Colors.slate500} />
            <Text style={styles.metaText}> {app.contact}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={13} color={Colors.slate500} />
            <Text style={styles.metaText}> Submitted: {app.submitted}</Text>
          </View>
          <View style={styles.loanRow}>
            <Text style={styles.loanLabel}>Loan Request: </Text>
            <Text style={styles.loanAmount}>{formatPhp(app.requestedLoanAmount)}</Text>
          </View>
        </View>

        {/* Score + Status */}
        <View style={styles.card}>
          <View style={styles.scoreRow}>
            <ScoreCircle score={app.rufusScore} />
            <View style={styles.statusBlock}>
              <Text style={styles.sectionLabel}>AI Status</Text>
              <StatusBadge status={app.aiStatus} />
              <Text style={styles.appId}>{app.id}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.green }]} onPress={() => handleAction('Approve')}>
            <Text style={styles.actionBtnText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.outlineBtn]} onPress={() => handleAction('Request Documents')}>
            <Text style={[styles.actionBtnText, { color: Colors.slate700 }]}>Request Docs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.red }]} onPress={() => handleAction('Decline')}>
            <Text style={styles.actionBtnText}>Decline</Text>
          </TouchableOpacity>
        </View>

        {/* AI Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={16} color={Colors.cyan} />
            <Text style={styles.cardTitle}>  AI Summary</Text>
          </View>
          <Text style={styles.summaryText}>{app.aiSummary}</Text>
        </View>

        {/* AI Score Breakdown */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="bar-chart-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  AI Score Breakdown</Text>
          </View>
          <ScoreBar label="Business Plan" score={app.scores.plan} />
          <ScoreBar label="Financial Statement" score={app.scores.financial} />
          <ScoreBar label="Business History" score={app.scores.history} />
        </View>

        {/* Risk Flags */}
        {app.flags.length > 0 && (
          <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: Colors.red }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="alert-triangle" size={16} color={Colors.red} />
              <Text style={[styles.cardTitle, { color: Colors.red }]}>  Risk Flags</Text>
            </View>
            {app.flags.map((flag, i) => (
              <View key={i} style={styles.flagItem}>
                <Ionicons name="warning-outline" size={14} color={Colors.red} />
                <Text style={styles.flagText}>{flag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Submitted Documents */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="attach-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  Submitted Documents</Text>
          </View>
          <DocRow label="Business Plan" done={app.docs.plan} />
          <DocRow label="Financial Statement" done={app.docs.financial} />
          <DocRow label="Business History" done={app.docs.history} />
        </View>

        {/* Digitized Financials */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="cash-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  Digitized Financials</Text>
          </View>
          {Object.entries(app.financials).map(([key, value], i, arr) => (
            <View key={key} style={[styles.finRow, i < arr.length - 1 && styles.finRowBorder]}>
              <Text style={styles.finLabel}>{key}</Text>
              <Text style={styles.finValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Application Timeline */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="time-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  Application Timeline</Text>
          </View>
          {app.timeline.map((event, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineDotCol}>
                <View style={[styles.timelineDot, { backgroundColor: i === 0 ? Colors.primary : Colors.slate300 }]} />
                {i < app.timeline.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{event.date}</Text>
                <Text style={styles.timelineEvent}>{event.event}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Officer Notes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="create-outline" size={16} color={Colors.primary} />
            <Text style={styles.cardTitle}>  Officer Notes</Text>
          </View>
          <TextInput
            style={styles.notesInput}
            multiline
            placeholder="Add your notes here..."
            placeholderTextColor={Colors.slate400}
            value={notes}
            onChangeText={setNotes}
          />
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => Alert.alert('Saved', 'Notes saved successfully.')}
          >
            <Text style={styles.saveBtnText}>Save Notes</Text>
          </TouchableOpacity>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, width: 70 },
  backText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
  headerTitle: { color: Colors.white, fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },

  scrollBg: { backgroundColor: Colors.slate50 },
  content: { padding: 16, paddingBottom: 40 },

  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.slate900 },

  businessName: { fontSize: 19, fontWeight: '800', color: Colors.slate900, marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  metaText: { fontSize: 13, color: Colors.slate600 },
  metaDot: { fontSize: 13, color: Colors.slate400 },
  loanRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  loanLabel: { fontSize: 13, color: Colors.slate600, fontWeight: '600' },
  loanAmount: { fontSize: 16, color: Colors.primary, fontWeight: '800' },

  scoreRow: { flexDirection: 'row', alignItems: 'center' },
  statusBlock: { flex: 1, paddingLeft: 16 },
  sectionLabel: { fontSize: 11, color: Colors.slate500, fontWeight: '600', textTransform: 'uppercase', marginBottom: 6 },
  appId: { fontSize: 11, color: Colors.slate400, marginTop: 8 },

  actionRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  outlineBtn: { borderWidth: 1, borderColor: Colors.slate200, backgroundColor: Colors.white },
  actionBtnText: { fontSize: 13, fontWeight: '700', color: Colors.white },

  summaryText: { fontSize: 14, color: Colors.slate700, lineHeight: 22 },

  scoreBarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  scoreBarLabel: { width: 110, fontSize: 12, color: Colors.slate600 },
  scoreBarTrack: { flex: 1, height: 8, backgroundColor: Colors.slate100, borderRadius: 4, overflow: 'hidden', marginRight: 8 },
  scoreBarFill: { height: 8, borderRadius: 4 },
  scoreBarNum: { width: 28, fontSize: 12, fontWeight: '700', color: Colors.slate700, textAlign: 'right' },

  flagItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  flagText: { fontSize: 13, color: Colors.red, flex: 1, lineHeight: 20 },

  docRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.slate100 },
  docLabel: { flex: 1, fontSize: 13, fontWeight: '600' },
  docStatus: { fontSize: 12, fontWeight: '600' },

  finRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  finRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.slate100 },
  finLabel: { fontSize: 13, color: Colors.slate600 },
  finValue: { fontSize: 13, fontWeight: '700', color: Colors.slate900 },

  timelineRow: { flexDirection: 'row', marginBottom: 4 },
  timelineDotCol: { alignItems: 'center', marginRight: 12, width: 12 },
  timelineDot: { width: 12, height: 12, borderRadius: 6 },
  timelineLine: { width: 2, flex: 1, backgroundColor: Colors.slate200, marginTop: 2 },
  timelineContent: { flex: 1, paddingBottom: 12 },
  timelineDate: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  timelineEvent: { fontSize: 13, color: Colors.slate700, marginTop: 2 },

  notesInput: {
    borderWidth: 1, borderColor: Colors.slate200, borderRadius: 10,
    padding: 12, fontSize: 14, color: Colors.slate800,
    textAlignVertical: 'top', minHeight: 100, marginBottom: 12,
  },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },
});
