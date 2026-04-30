import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Colors = {
  primary: '#1A4FA3',
  accent: '#17C5CB',
  background: '#F4F8FF',
  cardBg: '#FFFFFF',
  textPrimary: '#0D1B3E',
  textSecondary: '#4A6FA5',
  textMuted: '#8FA8CC',
  success: '#1A9E6A',
  successBg: '#E8F7F1',
};

export default function ApplicationSuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto-navigate after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/loaner');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleContinue = () => {
    router.replace('/loaner');
  };

  // Generate a fake reference number
  const referenceNumber = `APP-2026-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Checkmark Circle */}
        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmarkCircle}>
            <Ionicons
              name="checkmark-sharp"
              size={56}
              color={Colors.accent}
            />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Application Submitted!</Text>

        {/* Body Text */}
        <Text style={styles.bodyText}>
          Your loan application has been received and is under review.
        </Text>

        {/* Reference Number */}
        <View style={styles.referenceBox}>
          <Text style={styles.referenceLabel}>Reference No:</Text>
          <Text style={styles.referenceNumber}>{referenceNumber}</Text>
        </View>

        {/* Go to Dashboard Button */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.dashboardButtonText}>Go to Dashboard →</Text>
        </TouchableOpacity>

        {/* Auto-advance notice */}
        <Text style={styles.autoAdvanceText}>
          Redirecting in 2 seconds...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  checkmarkContainer: {
    marginBottom: 24,
  },

  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },

  bodyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 320,
  },

  referenceBox: {
    alignItems: 'center',
    marginBottom: 32,
  },

  referenceLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },

  referenceNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 1,
  },

  dashboardButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },

  dashboardButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.cardBg,
  },

  autoAdvanceText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});
