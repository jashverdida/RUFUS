import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, cardStyle } from '../../theme';

export default function QRProfileScreen() {
  const handleShare = () => {
    Alert.alert(
      'Share QR Code',
      'RUFUS QR Code\nLoan ID: RAFI-2026-04821\nName: Maria Dela Cruz'
    );
  };

  const handleDownload = () => {
    Alert.alert('Download', 'QR Code downloaded: RUFUS_QR_RAFI-2026-04821.png');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* QR Code Card */}
        <View style={styles.qrCard}>
          <View style={styles.qrCode}>
            {/* Simple QR pattern */}
            <View style={styles.qrPattern} />
            <View style={styles.qrCenterLogo}>
              <Text style={styles.qrLogoText}>R</Text>
            </View>
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Maria Dela Cruz</Text>
          <View style={styles.chipContainer}>
            <Ionicons name="card" size={16} color={colors.teal} />
            <Text style={styles.chipText}>RAFI-2026-04821</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.branchInfo}>
            <Ionicons name="business" size={16} color={colors.textSecondary} />
            <Text style={styles.branchLabel}>RAFI Talisay Branch</Text>
          </View>
        </View>

        {/* Instruction Banner */}
        <View style={styles.instruction}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="phone-portrait" size={16} color={colors.teal} />
            <Text style={styles.instructionText}>Show this to your RAFI Loan Officer for instant profile access</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleShare}>
            <Ionicons name="share-social" size={16} color={colors.white} />
            <Text style={styles.primaryBtnText}>Share QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleDownload}>
            <Ionicons name="download" size={16} color={colors.teal} />
            <Text style={styles.secondaryBtnText}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* Last Scanned */}
        <View style={styles.lastScanned}>
          <Text style={styles.lastScannedLabel}>Last Scanned</Text>
          <Text style={styles.lastScannedInfo}>Officer: Maria Santos</Text>
          <Text style={styles.lastScannedDetail}>April 28, 2026 at 2:45 PM</Text>
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Ionicons name="lock-closed" size={14} color={colors.textMuted} />
          <Text style={styles.securityText}>QR refreshes every 24 hours for security</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  qrCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 32,
    marginBottom: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  qrCode: {
    width: 280,
    height: 280,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  qrPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  qrCenterLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 4,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  qrLogoText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
  },
  profileInfo: {
    ...cardStyle,
    width: '100%',
    maxWidth: 360,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 12,
    alignSelf: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.infoBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
    marginBottom: 12,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.teal,
    fontFamily: 'Courier New',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
    marginBottom: 12,
  },
  branchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  branchLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  instruction: {
    backgroundColor: colors.infoBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.teal,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    width: '100%',
    maxWidth: 360,
  },
  instructionText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: 360,
    marginBottom: 16,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.teal,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: colors.teal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.teal,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: colors.teal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.teal,
  },
  lastScanned: {
    ...cardStyle,
    width: '100%',
    maxWidth: 360,
    marginBottom: 16,
  },
  lastScannedLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  lastScannedInfo: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  lastScannedDetail: {
    fontSize: 12,
    color: colors.textMuted,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    maxWidth: 360,
    justifyContent: 'center',
  },
  securityText: {
    fontSize: 12,
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
