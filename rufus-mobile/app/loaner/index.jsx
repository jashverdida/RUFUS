import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, cardStyle, smallCardStyle } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (global.userData) {
        setUserData(global.userData);
      } else {
        setUserData({
          name: 'Maria Dela Cruz',
          business: 'Dela Cruz Sari-Sari Store',
          loanAmount: 25000,
          balance: 18500,
          rufusScore: 74,
          amountPaid: 6500,
        });
      }
      setLoading(false);
    }, 300);
  }, []);

  const handleNotificationPress = () => {
    router.push('/loaner/notifications');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerLoader}>
          <ActivityIndicator size="large" color={colors.teal} />
        </View>
      </SafeAreaView>
    );
  }

  const firstName = userData?.name?.split(' ')[0] || 'User';
  const progressPercent = (userData?.amountPaid / userData?.loanAmount) * 100 || 26;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>R</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Kumusta, {firstName}!</Text>
              <Text style={styles.business}>{userData?.business}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            <Ionicons name="notifications" size={24} color={colors.teal} />
            {notifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{notifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.headerDivider} />

        {/* Active Loan Hero Card */}
        <LinearGradient
          colors={[colors.navy, colors.teal, colors.cyan]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.loanCard, { marginHorizontal: 20, marginTop: 16 }]}
        >
          <View style={styles.loanCardHeader}>
            <Text style={styles.loanLabel}>ACTIVE LOAN</Text>
            <Text style={styles.loanId}>RAFI-2026-04821</Text>
          </View>

          <Text style={styles.loanAmount}>₱{userData?.loanAmount?.toLocaleString()}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progressPercent)}% paid</Text>
          </View>

          <View style={styles.loanStatsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.statValue}>₱{userData?.balance?.toLocaleString()}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Due Date</Text>
              <Text style={styles.statValue}>May 5</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Term</Text>
              <Text style={styles.statValue}>12 mo.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewDetailsBtn}>
            <Text style={styles.viewDetailsBtnText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.navy} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </LinearGradient>

        {/* RUFUS Score Section */}
        <View style={[styles.scoreCard, { marginHorizontal: 20, marginTop: 20 }]}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>YOUR RUFUS SCORE</Text>
            <Text style={styles.scoreStatus}>Excellent Standing</Text>
          </View>
          <View style={styles.scoreCircle}>
            <View style={styles.scoreCircleInner}>
              <Text style={styles.scoreNumber}>{userData?.rufusScore}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={[typography.sectionHead, styles.actionsTitle]}>QUICK ACTIONS</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/loaner/documents')}
            >
              <View style={styles.actionIconBox}>
                <Ionicons name="document-text" size={28} color={colors.teal} />
              </View>
              <Text style={styles.actionLabel}>Submit Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/loaner/payments')}
            >
              <View style={styles.actionIconBox}>
                <Ionicons name="calendar" size={28} color={colors.teal} />
              </View>
              <Text style={styles.actionLabel}>View Payments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={handleNotificationPress}
            >
              <View style={styles.actionIconBox}>
                <Ionicons name="notifications" size={28} color={colors.teal} />
              </View>
              <Text style={styles.actionLabel}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/loaner/qr-profile')}
            >
              <View style={styles.actionIconBox}>
                <MaterialCommunityIcons name="qrcode" size={28} color={colors.teal} />
              </View>
              <Text style={styles.actionLabel}>My QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Next Payment Banner */}
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={18} color={colors.warning} style={{ marginRight: 12 }} />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Payment due in 3 days</Text>
            <Text style={styles.warningSubtext}>₱1,250.00 · May 2, 2026</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollView: {
    flex: 1,
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.navy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  headerText: {
    gap: 2,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  business: {
    fontSize: 12,
    color: colors.textMuted,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  headerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 20,
  },
  loanCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  loanLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  loanId: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '500',
  },
  loanAmount: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
  },
  progressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  loanStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginBottom: 4,
  },
  statValue: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  viewDetailsBtn: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
  },
  viewDetailsBtnText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  scoreCard: {
    ...cardStyle,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scoreLeft: {
    flex: 1,
    gap: 4,
  },
  scoreLabel: {
    ...typography.label,
    textTransform: 'uppercase',
  },
  scoreStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.teal,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCircleInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.navy,
    lineHeight: 28,
  },
  scoreMax: {
    fontSize: 11,
    color: colors.textMuted,
  },
  actionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  actionsTitle: {
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 64) / 2,
    ...smallCardStyle,
    borderWidth: 1,
    borderColor: colors.skyMid,
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.infoBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navy,
    textAlign: 'center',
  },
  warningBanner: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.warningBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  warningContent: {
    flex: 1,
    gap: 2,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.navy,
  },
  warningSubtext: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
