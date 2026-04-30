import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, cardStyle, smallCardStyle } from '../../theme';

export default function PaymentsScreen() {
  const [reminders, setReminders] = useState({
    'May 2': true,
    'May 5': true,
    'June 5': false,
    'July 5': false,
    'August 5': false,
    'September 5': false,
    'September 15': false,
  });

  const toggleReminder = (date) => {
    setReminders((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const paymentData = [
    {
      month: 'May 2026',
      payments: [
        { date: 'May 2, 2026', amount: 1250, status: 'due-soon', daysLeft: 3 },
        { date: 'May 5, 2026', amount: 1250, status: 'upcoming' },
      ],
    },
    {
      month: 'June 2026',
      payments: [
        { date: 'June 5, 2026', amount: 1250, status: 'upcoming' },
      ],
    },
    {
      month: 'July 2026',
      payments: [
        { date: 'July 5, 2026', amount: 1250, status: 'upcoming' },
      ],
    },
    {
      month: 'August 2026',
      payments: [
        { date: 'August 5, 2026', amount: 1250, status: 'upcoming' },
      ],
    },
    {
      month: 'September 2026',
      payments: [
        { date: 'September 5, 2026', amount: 1250, status: 'upcoming' },
        { date: 'September 15, 2026', amount: 250, status: 'upcoming' },
      ],
    },
  ];

  const getPaymentStatus = (status) => {
    switch (status) {
      case 'overdue':
        return { bg: colors.dangerBg, border: colors.danger, badge: 'OVERDUE' };
      case 'due-soon':
        return { bg: colors.warningBg, border: colors.warning, badge: 'DUE IN 3 DAYS' };
      case 'upcoming':
        return { bg: colors.white, border: colors.border, badge: null };
      case 'paid':
        return { bg: colors.successBg, border: colors.success, badge: 'PAID' };
      default:
        return { bg: colors.white, border: colors.border, badge: null };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Payment Schedule</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Remaining</Text>
            <Text style={styles.summaryValue}>₱8,750</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Payments Left</Text>
            <Text style={styles.summaryValue}>7</Text>
          </View>
        </View>

        {/* Payments by Month */}
        {paymentData.map((section, sectionIndex) => (
          <View key={sectionIndex}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>{section.month}</Text>
              <View style={styles.monthDivider} />
            </View>

            {section.payments.map((payment, index) => {
              const paymentStatus = getPaymentStatus(payment.status);
              const monthShort = payment.date.split(',')[0];

              return (
                <View
                  key={index}
                  style={[
                    styles.paymentCard,
                    { borderLeftColor: paymentStatus.border, backgroundColor: paymentStatus.bg },
                  ]}
                >
                  <View style={styles.paymentLeft}>
                    <View style={styles.paymentDateRow}>
                      <Text style={styles.paymentDate}>{payment.date}</Text>
                      {paymentStatus.badge && (
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: paymentStatus.border },
                          ]}
                        >
                          <Text style={styles.badgeText}>{paymentStatus.badge}</Text>
                        </View>
                      )}
                    </View>
                    {payment.status === 'due-soon' && (
                      <View style={styles.reminderRow}>
                        <Ionicons name="bell" size={12} color={colors.warning} />
                        <Text style={styles.reminderLabel}>Enable reminder</Text>
                        <Switch
                          value={reminders[monthShort]}
                          onValueChange={() => toggleReminder(monthShort)}
                          trackColor={{ false: colors.border, true: colors.teal }}
                          thumbColor={colors.white}
                          style={styles.toggle}
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.paymentRight}>
                    <Text style={[styles.paymentAmount, { color: paymentStatus.border }]}>
                      ₱{payment.amount.toLocaleString()}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}

        {/* Summary Footer */}
        <View style={styles.summaryFooter}>
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Total Loan</Text>
            <Text style={styles.footerValue}>₱25,000.00</Text>
          </View>
          <View style={styles.footerDivider} />
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Paid to Date</Text>
            <Text style={styles.footerValue}>₱16,250.00</Text>
          </View>
          <View style={styles.footerDivider} />
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Next Due</Text>
            <Text style={styles.footerValueHighlight}>May 2, 2026 • ₱1,250.00</Text>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  screenTitle: {
    ...typography.screenTitle,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    ...smallCardStyle,
    paddingVertical: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.label,
    marginBottom: 4,
  },
  summaryValue: {
    ...typography.cardValue,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
    gap: 12,
  },
  monthTitle: {
    ...typography.sectionHead,
    textTransform: 'uppercase',
  },
  monthDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  paymentCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderLeftWidth: 4,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentLeft: {
    flex: 1,
  },
  paymentDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reminderLabel: {
    fontSize: 11,
    color: colors.warning,
    fontWeight: '500',
  },
  toggle: {
    marginLeft: 'auto',
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.navy,
  },
  summaryFooter: {
    marginHorizontal: 20,
    marginTop: 20,
    ...cardStyle,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  footerValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navy,
  },
  footerValueHighlight: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.warning,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
