import { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Modal, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const formatPhp = (amount) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(amount);

const PAYMENT_COLORS = {
  paid: Colors.success,
  late: Colors.warning,
  missed: Colors.danger,
  upcoming: Colors.backgroundSecondary,
};

const STATUS_CONFIG = {
  current: { bg: Colors.successBg, text: Colors.success, label: 'Current' },
  due: { bg: Colors.warningBg, text: Colors.warning, label: 'Due Soon' },
  overdue: { bg: Colors.dangerBg, text: Colors.danger, label: 'Overdue' },
};

const RISK_CONFIG = {
  'Low Risk': { bg: Colors.successBg, text: Colors.success },
  'Watch': { bg: Colors.warningBg, text: Colors.warning },
  'High Risk': { bg: Colors.dangerBg, text: Colors.danger },
};

const loansData = [
  {
    id: 1, name: 'Mang Juan Hardware & Building Supply',
    category: 'Retail - Construction Materials',
    loanAmount: 350000, balance: 4500, nextDue: '2026-05-05',
    daysStatus: 'current', history: ['paid', 'paid', 'paid', 'paid', 'paid', 'paid'],
    risk: 'Low Risk',
  },
  {
    id: 2, name: "Maria's Catering & Events",
    category: 'Food Services - Catering',
    loanAmount: 180000, balance: 28000, nextDue: '2026-04-30',
    daysStatus: 'due', history: ['paid', 'paid', 'paid', 'late', 'paid', 'paid'],
    risk: 'Watch',
  },
  {
    id: 3, name: 'Sarao Motors Workshop',
    category: 'Services - Auto Repair',
    loanAmount: 425000, balance: 95000, nextDue: '2026-04-21',
    daysStatus: 'overdue', history: ['paid', 'late', 'paid', 'missed', 'late', 'paid'],
    risk: 'High Risk',
  },
  {
    id: 4, name: "Leny's Beauty Salon & Spa",
    category: 'Beauty & Wellness Services',
    loanAmount: 95000, balance: 71000, nextDue: '2026-05-10',
    daysStatus: 'current', history: ['paid', 'paid', 'late', 'paid', 'paid', 'paid'],
    risk: 'Watch',
  },
];

const RISK_PREDICTOR = [
  { id: 2, name: "Maria's Catering & Events", risk: 'Watch', likelihood: 42 },
  { id: 3, name: 'Sarao Motors Workshop', risk: 'High Risk', likelihood: 68 },
];

const REMINDER_METHODS = ['SMS', 'Email', 'In-App'];

export default function CollectionsScreen() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reminderMethod, setReminderMethod] = useState('SMS');
  const [message, setMessage] = useState('');

  const sorted = [...loansData].sort((a, b) => {
    const order = { overdue: 0, due: 1, current: 2 };
    return order[a.daysStatus] - order[b.daysStatus];
  });

  const total = loansData.length;
  const current = loansData.filter((l) => l.daysStatus === 'current').length;
  const due = loansData.filter((l) => l.daysStatus === 'due').length;
  const overdue = loansData.filter((l) => l.daysStatus === 'overdue').length;

  const openReminder = (loan) => {
    setSelectedLoan(loan);
    setMessage(
      `Magandang araw! Ito ay isang paalala na ang iyong bayad para sa ${loan.name} ay dapat bayaran bago ang ${loan.nextDue}. Mangyaring makipag-ugnayan sa aming opisina para sa anumang katanungan. Salamat!`
    );
    setShowModal(true);
  };

  const sendReminder = () => {
    setShowModal(false);
    Alert.alert('Reminder Sent', `${reminderMethod} reminder sent to ${selectedLoan.name}.`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* KPI Cards */}
        <View style={styles.kpiRow}>
          {[
            { label: 'Total Loans', value: total, icon: 'wallet-outline', color: Colors.primary },
            { label: 'Current', value: current, icon: 'checkmark-circle-outline', color: Colors.success },
            { label: 'Due This Week', value: due, icon: 'time-outline', color: Colors.warning },
            { label: 'Overdue', value: overdue, icon: 'alert-triangle', color: Colors.danger },
          ].map((k) => (
            <View key={k.label} style={[styles.kpiCard, { borderTopColor: k.color }]}>
              <Ionicons name={k.icon} size={18} color={k.color} />
              <Text style={[styles.kpiValue, { color: k.color }]}>{k.value}</Text>
              <Text style={styles.kpiLabel}>{k.label}</Text>
            </View>
          ))}
        </View>

        {/* Active Loan Accounts */}
        <Text style={styles.sectionTitle}>Active Loan Accounts</Text>

        {sorted.map((loan) => {
          const status = STATUS_CONFIG[loan.daysStatus];
          const riskConf = RISK_CONFIG[loan.risk];
          return (
            <View key={loan.id} style={styles.loanCard}>
              <View style={styles.loanTop}>
                <View style={styles.loanInfo}>
                  <Text style={styles.loanName}>{loan.name}</Text>
                  <Text style={styles.loanCategory}>{loan.category}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                  <Text style={[styles.statusText, { color: status.text }]}>{status.label}</Text>
                </View>
              </View>

              <View style={styles.loanMid}>
                <View>
                  <Text style={styles.loanMetaLabel}>Loan Amount</Text>
                  <Text style={styles.loanMetaValue}>{formatPhp(loan.loanAmount)}</Text>
                </View>
                <View>
                  <Text style={styles.loanMetaLabel}>Remaining</Text>
                  <Text style={[styles.loanMetaValue, { color: Colors.primary }]}>{formatPhp(loan.balance)}</Text>
                </View>
                <View>
                  <Text style={styles.loanMetaLabel}>Next Due</Text>
                  <Text style={styles.loanMetaValue}>{loan.nextDue}</Text>
                </View>
              </View>

              {/* Payment History Dots */}
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Payment History:</Text>
                <View style={styles.dots}>
                  {loan.history.map((h, i) => (
                    <View key={i} style={[styles.dot, { backgroundColor: PAYMENT_COLORS[h] }]} />
                  ))}
                </View>
              </View>

              <View style={styles.loanBottom}>
                <View style={[styles.riskBadge, { backgroundColor: riskConf.bg }]}>
                  <Text style={[styles.riskText, { color: riskConf.text }]} numberOfLines={1}>{loan.risk}</Text>
                </View>
                <TouchableOpacity style={styles.remindBtn} onPress={() => openReminder(loan)}>
                  <Ionicons name="send-outline" size={14} color={Colors.white} />
                  <Text style={styles.remindBtnText}>Remind</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* AI Risk Predictor */}
        <Text style={styles.sectionTitle}>AI Collections Risk Predictor</Text>
        {RISK_PREDICTOR.map((item) => {
          const riskConf = RISK_CONFIG[item.risk];
          const barColor = item.likelihood >= 60 ? Colors.danger : Colors.warning;
          return (
            <View key={item.id} style={styles.riskCard}>
              <View style={styles.riskCardTop}>
                <Text style={styles.riskCardName}>{item.name}</Text>
                <View style={[styles.riskBadge, { backgroundColor: riskConf.bg }]}>
                  <Text style={[styles.riskText, { color: riskConf.text }]} numberOfLines={1}>{item.risk}</Text>
                </View>
              </View>
              <Text style={[styles.likelihoodNum, { color: barColor }]}>{item.likelihood}%</Text>
              <Text style={styles.likelihoodLabel}>Likelihood of late payment</Text>
              <View style={styles.riskBarBg}>
                <View style={[styles.riskBarFill, { width: `${item.likelihood}%`, backgroundColor: barColor }]} />
              </View>
              <TouchableOpacity style={[styles.flagBtn, { borderColor: barColor }]}>
                <Ionicons name="flag-outline" size={14} color={barColor} />
                <Text style={[styles.flagBtnText, { color: barColor }]}>Flag Account</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Reminder Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Send Reminder</Text>
            {selectedLoan && (
              <View style={styles.modalLoanInfo}>
                <Text style={styles.modalLoanName}>{selectedLoan.name}</Text>
                <Text style={styles.modalLoanDue}>Due: {selectedLoan.nextDue}</Text>
              </View>
            )}

            {/* Method Tabs */}
            <View style={styles.methodRow}>
              {REMINDER_METHODS.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.methodTab, reminderMethod === m && styles.methodTabActive]}
                  onPress={() => setReminderMethod(m)}
                >
                  <Text style={[styles.methodTabText, reminderMethod === m && styles.methodTabTextActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.messageInput}
              multiline
              value={message}
              onChangeText={setMessage}
              numberOfLines={5}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendBtn} onPress={sendReminder}>
                <Text style={styles.sendBtnText}>Send Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundSecondary },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  kpiRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  kpiCard: {
    flex: 1, backgroundColor: Colors.background, borderRadius: 10,
    padding: 10, borderTopWidth: 3, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  kpiValue: { fontSize: 20, fontWeight: '800', marginTop: 4 },
  kpiLabel: { fontSize: 9, color: Colors.textSecondary, marginTop: 2, fontWeight: '600', textAlign: 'center' },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },

  loanCard: {
    backgroundColor: Colors.background, borderRadius: 12, padding: 14, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  loanTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  loanInfo: { flex: 1, marginRight: 8 },
  loanName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  loanCategory: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  statusText: { fontSize: 11, fontWeight: '700' },

  loanMid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  loanMetaLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '600', marginBottom: 2 },
  loanMetaValue: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },

  historyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  historyLabel: { fontSize: 11, color: Colors.textSecondary, marginRight: 8 },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 10, height: 10, borderRadius: 5 },

  loanBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, flexShrink: 0 },
  riskText: { fontSize: 11, fontWeight: '700' },
  remindBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
  },
  remindBtnText: { color: Colors.background, fontSize: 12, fontWeight: '700' },

  riskCard: {
    backgroundColor: Colors.background, borderRadius: 12, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  riskCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  riskCardName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, flex: 1, marginRight: 8 },
  likelihoodNum: { fontSize: 36, fontWeight: '800' },
  likelihoodLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 10 },
  riskBarBg: { height: 8, backgroundColor: Colors.backgroundSecondary, borderRadius: 4, marginBottom: 12, overflow: 'hidden' },
  riskBarFill: { height: 8, borderRadius: 4 },
  flagBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8, alignSelf: 'flex-start',
  },
  flagBtnText: { fontSize: 12, fontWeight: '700' },

  modalBg: { flex: 1, backgroundColor: 'rgba(10, 30, 80, 0.4)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: Colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, paddingBottom: 36,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  modalLoanInfo: {
    backgroundColor: Colors.backgroundSecondary, borderRadius: 10, padding: 12, marginBottom: 14,
  },
  modalLoanName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  modalLoanDue: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  methodRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  methodTab: {
    flex: 1, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1, borderColor: Colors.borderLight, alignItems: 'center',
  },
  methodTabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  methodTabText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  methodTabTextActive: { color: Colors.background },
  messageInput: {
    borderWidth: 1, borderColor: Colors.borderLight, borderRadius: 10,
    padding: 12, fontSize: 13, color: Colors.textPrimary,
    textAlignVertical: 'top', minHeight: 100, marginBottom: 16,
  },
  modalActions: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 10,
    borderWidth: 1, borderColor: Colors.borderLight, alignItems: 'center',
  },
  cancelBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  sendBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: Colors.primary, alignItems: 'center' },
  sendBtnText: { fontSize: 14, fontWeight: '700', color: Colors.background },
});
