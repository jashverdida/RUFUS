import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';

const NOTIF_TOGGLES = [
  { key: 'paymentDue', label: 'Payment Due Reminders', desc: 'Get reminded 3 days before your due date' },
  { key: 'paymentConfirm', label: 'Payment Confirmations', desc: 'Notify when a payment is recorded' },
  { key: 'scoreUpdate', label: 'RUFUS Score Updates', desc: 'Alert when your score changes' },
  { key: 'loanStatus', label: 'Loan Status Changes', desc: 'Updates on your loan application status' },
  { key: 'promos', label: 'Offers & Announcements', desc: 'RAFI news and loan promos' },
];

export default function LoanerSettingsScreen() {
  const router = useRouter();
  const user = global.userData || {};

  const [toggles, setToggles] = useState({
    paymentDue: true,
    paymentConfirm: true,
    scoreUpdate: true,
    loanStatus: true,
    promos: false,
  });
  const [language, setLanguage] = useState('english');

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = () =>
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive', onPress: () => {
          global.userData = null;
          router.replace('/login');
        }
      },
    ]);

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
    : 'MD';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name || 'Maria Dela Cruz'}</Text>
            <Text style={styles.profileSub}>{user.business || 'Dela Cruz Sari-Sari Store'}</Text>
            <Text style={styles.profileSub}>{user.branch || 'RAFI Talisay Branch'}</Text>
          </View>
        </View>

        {/* Account Info */}
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.card}>
          {[
            { label: 'Phone Number', value: user.phone || '09XX XXX XXXX' },
            { label: 'Loan ID', value: user.loanId || 'RAFI-2026-04821' },
            { label: 'Branch', value: user.branch || 'RAFI Talisay Branch' },
          ].map((item, i, arr) => (
            <View key={item.label} style={[styles.infoRow, i < arr.length - 1 && styles.rowBorder]}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Notification Preferences */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.card}>
          {NOTIF_TOGGLES.map((item, index) => (
            <View key={item.key} style={[styles.toggleRow, index < NOTIF_TOGGLES.length - 1 && styles.rowBorder]}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>{item.label}</Text>
                <Text style={styles.toggleDesc}>{item.desc}</Text>
              </View>
              <Switch
                value={toggles[item.key]}
                onValueChange={() => toggle(item.key)}
                trackColor={{ false: '#E0E0E0', true: colors.skyMid }}
                thumbColor={toggles[item.key] ? colors.teal : '#9E9E9E'}
              />
            </View>
          ))}
        </View>

        {/* Language */}
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.card}>
          {['english', 'filipino'].map((lang, i) => (
            <TouchableOpacity
              key={lang}
              style={[styles.langRow, i === 0 && styles.rowBorder]}
              onPress={() => setLanguage(lang)}
            >
              <Text style={styles.toggleLabel}>{lang === 'english' ? 'English' : 'Filipino'}</Text>
              {language === lang && <Ionicons name="checkmark-circle" size={20} color={colors.teal} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },

  profileCard: {
    backgroundColor: colors.white, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: colors.white },
  profileInfo: { flex: 1, gap: 2 },
  profileName: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  profileSub: { fontSize: 12, color: colors.textMuted },

  sectionTitle: { fontSize: 13, fontWeight: '800', color: colors.textMuted, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },

  card: {
    backgroundColor: colors.white, borderRadius: 12, paddingHorizontal: 16, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  infoLabel: { fontSize: 13, color: colors.textMuted },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },

  toggleRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  toggleInfo: { flex: 1, marginRight: 12 },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  toggleDesc: { fontSize: 11, color: colors.textMuted, marginTop: 2 },

  langRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1, borderColor: '#E53935', borderRadius: 12,
    padding: 14, marginBottom: 20,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#E53935' },
});
