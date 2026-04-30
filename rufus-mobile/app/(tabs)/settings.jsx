import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const SYS_INFO = [
  { label: 'System Version', value: 'RUFUS v2.1.0' },
  { label: 'AI Engine', value: 'RUFUS-AI v3.4' },
  { label: 'PDF Processor', value: 'DocParser v1.2' },
  { label: 'Last Updated', value: 'Apr 28, 2026' },
  { label: 'Branch', value: 'Bacolod Main' },
  { label: 'Database', value: 'Connected ✓' },
];

const NOTIF_TOGGLES = [
  { key: 'overdue', label: 'Overdue Payment Alerts', desc: 'Get notified when a borrower misses a payment' },
  { key: 'upcoming', label: 'Upcoming Due Date Reminders', desc: 'Reminders 3 days before payment due' },
  { key: 'newApp', label: 'New Application Submitted', desc: 'Alert when a new loan application arrives' },
  { key: 'aiDone', label: 'AI Analysis Completion', desc: 'Notify when RUFUS finishes scoring an application' },
  { key: 'weekly', label: 'Weekly Collections Summary', desc: 'Weekly digest of collection activity' },
  { key: 'maintenance', label: 'System Maintenance Notices', desc: 'Scheduled downtime and update alerts' },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState({
    overdue: true, upcoming: true, newApp: true,
    aiDone: false, weekly: true, maintenance: false,
  });
  const [preApprovalScore, setPreApprovalScore] = useState(75);
  const [confidenceWeight, setConfidenceWeight] = useState(60);

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleClearCache = () =>
    Alert.alert(
      'Clear Cache?',
      'This will remove all cached application data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => Alert.alert('Done', 'Cache cleared successfully.') },
      ]
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Officer Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Dela Cruz</Text>
            <Text style={styles.profileTitle}>Loan Officer</Text>
            <Text style={styles.profileBranch}>Bacolod Main Branch · EMP-2024-001</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Notification Preferences */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.card}>
          {NOTIF_TOGGLES.map((item, index) => (
            <View key={item.key} style={[styles.toggleRow, index < NOTIF_TOGGLES.length - 1 && styles.toggleBorder]}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>{item.label}</Text>
                <Text style={styles.toggleDesc}>{item.desc}</Text>
              </View>
              <Switch
                value={toggles[item.key]}
                onValueChange={() => toggle(item.key)}
                trackColor={{ false: Colors.borderLight, true: Colors.accentLight }}
                thumbColor={toggles[item.key] ? Colors.accent : Colors.textMuted}
              />
            </View>
          ))}
        </View>

        {/* AI Scoring Configuration */}
        <Text style={styles.sectionTitle}>AI Scoring Configuration</Text>
        <View style={styles.card}>
          <Text style={styles.configLabel}>Pre-Approval Threshold</Text>
          <Text style={styles.configDesc}>Applications scoring above this are flagged for fast-track approval</Text>
          <View style={styles.sliderRow}>
            <TouchableOpacity
              style={styles.sliderBtn}
              onPress={() => setPreApprovalScore((v) => Math.max(60, v - 1))}
            >
              <Ionicons name="remove" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${((preApprovalScore - 60) / 40) * 100}%` }]} />
            </View>
            <TouchableOpacity
              style={styles.sliderBtn}
              onPress={() => setPreApprovalScore((v) => Math.min(100, v + 1))}
            >
              <Ionicons name="add" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.sliderValue}>{preApprovalScore}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.configLabel}>Manual Review Thresholds</Text>
          <View style={styles.thresholdRow}>
            <View style={styles.thresholdBox}>
              <Text style={styles.thresholdNum}>65</Text>
              <Text style={styles.thresholdTag}>LOW</Text>
            </View>
            <View style={[styles.thresholdBox, { backgroundColor: Colors.warningBg }]}>
              <Text style={[styles.thresholdNum, { color: Colors.warning }]}>79</Text>
              <Text style={[styles.thresholdTag, { color: Colors.warning }]}>HIGH</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.configLabel}>Confidence Weight</Text>
          <Text style={styles.configDesc}>How much AI confidence affects the final RUFUS Score</Text>
          <View style={styles.sliderRow}>
            <TouchableOpacity
              style={styles.sliderBtn}
              onPress={() => setConfidenceWeight((v) => Math.max(0, v - 5))}
            >
              <Ionicons name="remove" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${confidenceWeight}%` }]} />
            </View>
            <TouchableOpacity
              style={styles.sliderBtn}
              onPress={() => setConfidenceWeight((v) => Math.min(100, v + 5))}
            >
              <Ionicons name="add" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.sliderValue}>{confidenceWeight}%</Text>
          </View>
        </View>

        {/* System Information */}
        <Text style={styles.sectionTitle}>System Information</Text>
        <View style={styles.card}>
          {SYS_INFO.map((item, index) => (
            <View key={item.label} style={[styles.sysRow, index < SYS_INFO.length - 1 && styles.toggleBorder]}>
              <Text style={styles.sysLabel}>{item.label}</Text>
              <Text style={styles.sysValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Data Management */}
        <Text style={styles.sectionTitle}>Data Management</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.dataBtn}
            onPress={() => Alert.alert('Export', 'Exporting all data...')}
          >
            <Ionicons name="download-outline" size={18} color={Colors.primary} />
            <Text style={[styles.dataBtnText, { color: Colors.primary }]}>Export All Data</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={[styles.dataBtn, { borderWidth: 1, borderColor: Colors.danger, borderRadius: 8, padding: 12 }]} onPress={handleClearCache}>
            <Ionicons name="trash-outline" size={18} color={Colors.danger} />
            <Text style={[styles.dataBtnText, { color: Colors.danger }]}>Clear Application Cache</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundSecondary },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },

  profileCard: {
    backgroundColor: Colors.background, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: Colors.background },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  profileTitle: { fontSize: 13, color: Colors.primary, fontWeight: '600', marginTop: 2 },
  profileBranch: { fontSize: 11, color: Colors.textSecondary, marginTop: 3 },
  editBtn: { padding: 8 },

  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginBottom: 10 },

  card: {
    backgroundColor: Colors.background, borderRadius: 12, padding: 16, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  toggleRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  toggleBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  toggleInfo: { flex: 1, marginRight: 12 },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  toggleDesc: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },

  configLabel: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  configDesc: { fontSize: 12, color: Colors.textSecondary, marginBottom: 10 },
  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sliderBtn: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.borderLight, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background,
  },
  sliderTrack: {
    flex: 1, height: 8, backgroundColor: Colors.backgroundSecondary,
    borderRadius: 4, overflow: 'hidden',
  },
  sliderFill: { height: 8, backgroundColor: Colors.accent, borderRadius: 4 },
  sliderValue: { fontSize: 15, fontWeight: '800', color: Colors.primary, minWidth: 36, textAlign: 'right' },

  thresholdRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  thresholdBox: {
    flex: 1, backgroundColor: Colors.infoBg, borderRadius: 10,
    padding: 14, alignItems: 'center',
  },
  thresholdNum: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  thresholdTag: { fontSize: 11, fontWeight: '700', color: Colors.primary, marginTop: 4 },

  divider: { height: 1, backgroundColor: Colors.borderLight, marginVertical: 14 },

  sysRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  sysLabel: { fontSize: 13, color: Colors.textSecondary },
  sysValue: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },

  dataBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  dataBtnText: { fontSize: 14, fontWeight: '700' },
});
