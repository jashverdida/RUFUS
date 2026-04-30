// FILE: screens/PaymentsScreen.jsx
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
        {paymentData.map((section, sectionIndex) => {
          const statusConfig = getPaymentStatus(section.payments[0]?.status);
          return (
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
                              {
                                backgroundColor: paymentStatus.border,
                              },
                            ]}
                          >
                            <Text style={styles.badgeText}>{paymentStatus.badge}</Text>
                          </View>
                        )}
                      </View>
                      {payment.status === 'due-soon' && (
                        <View style={styles.reminderRow}>
                          <Ionicons name="notifications" size={12} color={colors.warning} />
                          <Text style={styles.reminderLabel}>Set reminder</Text>\n                          <Switch\n                            value={reminders[monthShort]}\n                            onValueChange={() => toggleReminder(monthShort)}\n                            trackColor={{ false: colors.border, true: colors.teal }}\n                            thumbColor={colors.white}\n                            style={styles.toggle}\n                          />\n                        </View>\n                      )}\n                    </View>\n                    <View style={styles.paymentRight}>\n                      <Text style={[styles.paymentAmount, { color: paymentStatus.border }]}>\n                        ₱{payment.amount.toLocaleString()}\n                      </Text>\n                    </View>\n                  </View>\n                );\n              })}\n            </View>\n          );\n        })}\n\n        {/* Summary Footer */}\n        <View style={styles.summaryFooter}>\n          <View style={styles.footerRow}>\n            <Text style={styles.footerLabel}>Total Loan</Text>\n            <Text style={styles.footerValue}>₱25,000.00</Text>\n          </View>\n          <View style={styles.footerDivider} />\n          <View style={styles.footerRow}>\n            <Text style={styles.footerLabel}>Paid to Date</Text>\n            <Text style={styles.footerValue}>₱16,250.00</Text>\n          </View>\n          <View style={styles.footerDivider} />\n          <View style={styles.footerRow}>\n            <Text style={styles.footerLabel}>Next Due</Text>\n            <Text style={styles.footerValueHighlight}>May 2, 2026 • ₱1,250.00</Text>\n          </View>\n        </View>\n\n        <View style={{ height: 40 }} />\n      </ScrollView>\n    </SafeAreaView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: colors.offWhite,\n  },\n  scrollView: {\n    flex: 1,\n  },\n  header: {\n    paddingHorizontal: 20,\n    paddingVertical: 16,\n  },\n  screenTitle: {\n    ...typography.screenTitle,\n  },\n  summaryContainer: {\n    flexDirection: 'row',\n    gap: 12,\n    paddingHorizontal: 20,\n    marginBottom: 24,\n  },\n  summaryCard: {\n    flex: 1,\n    ...smallCardStyle,\n    paddingVertical: 16,\n    alignItems: 'center',\n  },\n  summaryLabel: {\n    ...typography.label,\n    marginBottom: 4,\n  },\n  summaryValue: {\n    ...typography.cardValue,\n  },\n  monthHeader: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    paddingHorizontal: 20,\n    paddingVertical: 12,\n    marginBottom: 8,\n    gap: 12,\n  },\n  monthTitle: {\n    ...typography.sectionHead,\n    textTransform: 'uppercase',\n  },\n  monthDivider: {\n    flex: 1,\n    height: 1,\n    backgroundColor: colors.border,\n  },\n  paymentCard: {\n    marginHorizontal: 20,\n    marginBottom: 10,\n    paddingHorizontal: 16,\n    paddingVertical: 14,\n    backgroundColor: colors.white,\n    borderLeftWidth: 4,\n    borderRadius: 12,\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    minHeight: 56,\n    shadowColor: colors.cardShadow,\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.8,\n    shadowRadius: 4,\n    elevation: 2,\n  },\n  paymentLeft: {\n    flex: 1,\n  },\n  paymentDateRow: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    gap: 8,\n    marginBottom: 4,\n  },\n  paymentDate: {\n    fontSize: 14,\n    fontWeight: '600',\n    color: colors.textPrimary,\n  },\n  badge: {\n    paddingHorizontal: 8,\n    paddingVertical: 2,\n    borderRadius: 100,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  badgeText: {\n    fontSize: 9,\n    fontWeight: '700',\n    color: colors.white,\n    letterSpacing: 0.5,\n  },\n  reminderRow: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    gap: 6,\n  },\n  reminderLabel: {\n    fontSize: 11,\n    color: colors.warning,\n    fontWeight: '500',\n  },\n  toggle: {\n    marginLeft: 'auto',\n  },\n  paymentRight: {\n    alignItems: 'flex-end',\n  },\n  paymentAmount: {\n    fontSize: 15,\n    fontWeight: '800',\n    color: colors.navy,\n  },\n  summaryFooter: {\n    marginHorizontal: 20,\n    marginTop: 20,\n    ...cardStyle,\n  },\n  footerRow: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    paddingVertical: 12,\n  },\n  footerLabel: {\n    fontSize: 14,\n    fontWeight: '600',\n    color: colors.textSecondary,\n  },\n  footerValue: {\n    fontSize: 15,\n    fontWeight: '700',\n    color: colors.navy,\n  },\n  footerValueHighlight: {\n    fontSize: 15,\n    fontWeight: '700',\n    color: colors.warning,\n  },\n  footerDivider: {\n    height: 1,\n    backgroundColor: colors.border,\n  },\n});
