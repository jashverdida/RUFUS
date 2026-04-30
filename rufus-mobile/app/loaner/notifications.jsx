import React, { useState } from 'react';
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

export default function NotificationsScreen() {
  const [unreadIds, setUnreadIds] = useState([1, 2, 3]);

  const notifications = [
    {
      id: 1,
      type: 'overdue',
      icon: 'alert-circle',
      title: 'Payment Past Due',
      message: 'Your payment of ₱1,250.00 was due on April 25, 2026. Please pay immediately to avoid penalties.',
      time: '1 hour ago',
      badge: 'OVERDUE',
    },
    {
      id: 2,
      type: 'reminder',
      icon: 'time',
      title: 'Payment Due Soon',
      message: 'Your next payment of ₱1,250.00 is due on May 2, 2026. Set a reminder to avoid missing it.',
      time: '3 hours ago',
      badge: 'REMINDER',
    },
    {
      id: 3,
      type: 'approved',
      icon: 'checkmark-circle',
      title: 'Document Approved',
      message: 'Your Business Plan document has been approved by Loan Officer Maria Santos. Keep it safe for records.',
      time: 'Yesterday at 3:20 PM',
      badge: 'APPROVED',
    },
    {
      id: 4,
      type: 'score',
      icon: 'trending-up',
      title: 'Your RUFUS Score Updated',
      message: 'Congratulations! Your RUFUS Score has improved to 74/100. Your excellent repayment history is noted.',
      time: 'April 25, 2026',
      badge: 'SCORE UPDATE',
    },
    {
      id: 5,
      type: 'system',
      icon: 'information-circle',
      title: 'Application Status Update',
      message: 'Your loan application documents are under review by RAFI Talisay Branch. You will be notified of approval within 5 business days.',
      time: 'April 20, 2026',
      badge: 'INFO',
    },
    {
      id: 6,
      type: 'approved',
      icon: 'checkmark-circle',
      title: 'Payment Received',
      message: 'Your payment of ₱1,250.00 for April has been successfully received and processed.',
      time: 'April 15, 2026',
      badge: 'APPROVED',
    },
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'overdue':
        return { borderLeftColor: colors.danger, bgColor: colors.dangerBg, iconColor: colors.danger };
      case 'reminder':
        return { borderLeftColor: colors.warning, bgColor: colors.warningBg, iconColor: colors.warning };
      case 'approved':
        return { borderLeftColor: colors.success, bgColor: colors.successBg, iconColor: colors.success };
      case 'score':
        return { borderLeftColor: colors.teal, bgColor: colors.infoBg, iconColor: colors.teal };
      case 'system':
        return { borderLeftColor: colors.textMuted, bgColor: colors.offWhite, iconColor: colors.textMuted };
      default:
        return { borderLeftColor: colors.border, bgColor: colors.white, iconColor: colors.textSecondary };
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'overdue':
        return { bg: colors.dangerBg, text: colors.danger };
      case 'reminder':
        return { bg: colors.warningBg, text: colors.warning };
      case 'approved':
        return { bg: colors.successBg, text: colors.success };
      case 'score':
        return { bg: colors.infoBg, text: colors.teal };
      case 'system':
        return { bg: colors.offWhite, text: colors.textMuted };
      default:
        return { bg: colors.skyLight, text: colors.textMuted };
    }
  };

  const markAllAsRead = () => {
    setUnreadIds([]);
    Alert.alert('Success', 'All notifications marked as read');
  };

  const markAsRead = (id) => {
    setUnreadIds((prev) => prev.filter((unreadId) => unreadId !== id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header with Mark All Read */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Alerts & Notifications</Text>
        {unreadIds.length > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllBtn}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {notifications.map((notif) => {
            const isUnread = unreadIds.includes(notif.id);
            const { borderLeftColor, bgColor, iconColor } = getNotificationStyle(notif.type);
            const badgeStyle = getBadgeStyle(notif.type);

            return (
              <TouchableOpacity
                key={notif.id}
                style={[
                  styles.notificationItem,
                  { borderLeftColor, backgroundColor: bgColor },
                ]}
                onPress={() => markAsRead(notif.id)}
              >
                {/* Unread Indicator Dot */}
                {isUnread && <View style={styles.unreadDot} />}

                {/* Icon */}
                <Ionicons
                  name={notif.icon}
                  size={20}
                  color={iconColor}
                  style={styles.notificationIcon}
                />

                {/* Content */}
                <View style={styles.notificationContent}>
                  {/* Badge Row */}
                  <View style={styles.notificationBadgeRow}>
                    <View style={[styles.notificationBadge, { backgroundColor: badgeStyle.bg }]}>
                      <Text style={[styles.notificationBadgeText, { color: badgeStyle.text }]}>
                        {notif.badge}
                      </Text>
                    </View>
                    <Text style={styles.notificationTime}>{notif.time}</Text>
                  </View>

                  {/* Title */}
                  <Text style={styles.notificationTitle}>{notif.title}</Text>

                  {/* Message */}
                  <Text style={styles.notificationMessage}>{notif.message}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
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
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.screenTitle,
  },
  markAllBtn: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.teal,
    textDecorationLine: 'underline',
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  notificationItem: {
    position: 'relative',
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 14,
    backgroundColor: colors.white,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    minHeight: 80,
  },
  unreadDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.teal,
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
    minWidth: 20,
  },
  notificationContent: {
    flex: 1,
    marginRight: 28, // Space for unread dot
  },
  notificationBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  notificationBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
