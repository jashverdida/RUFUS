import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('loaner'); // 'loaner' or 'officer'
  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.02,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseScale]);

  const handlePinPress = (digit) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleLogin = async () => {
    if (phone.length < 10 || pin.length !== 6) {
      Alert.alert('Invalid Input', 'Please enter a valid phone number and 6-digit PIN');
      return;
    }

    setLoading(true);
    try {
      // Simulate login
      setTimeout(() => {
        // Store user data
        if (!global.userData) {
          global.userData = {};
        }
        global.userData = {
          userType: userType, // 'loaner' or 'officer'
          name: userType === 'loaner' ? 'Maria Dela Cruz' : 'Maria Santos',
          phone: phone,
          loanId: userType === 'loaner' ? 'RAFI-2026-04821' : undefined,
          loanAmount: userType === 'loaner' ? 25000 : undefined,
          balance: userType === 'loaner' ? 18500 : undefined,
          rufusScore: userType === 'loaner' ? 74 : undefined,
          branch: 'RAFI Talisay Branch',
          business: userType === 'loaner' ? 'Dela Cruz Sari-Sari Store, Talisay City, Cebu' : undefined,
          employeeId: userType === 'officer' ? 'RAFI-EMP-2026-001' : undefined,
          role: userType === 'officer' ? 'Loan Officer' : undefined,
        };

        // Route based on user type
        if (userType === 'officer') {
          router.replace('/(tabs)');
        } else {
          router.replace('/loaner');
        }
      }, 1500);
    } catch (error) {
      Alert.alert('Login Error', 'Failed to log in. Please try again.');
      setLoading(false);
    }
  };

  const pinButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', 'DEL'],
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/rufus-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>RUFUS</Text>
          <Text style={styles.tagline}>"Your loan. Your way. Simplified."</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Enter Your Details</Text>

          {/* User Type Selector */}
          <View style={styles.userTypeSelector}>
            <TouchableOpacity
              style={[
                styles.userTypeBtn,
                userType === 'loaner' && styles.userTypeBtnActive,
              ]}
              onPress={() => setUserType('loaner')}
            >
              <Ionicons
                name="person-circle"
                size={20}
                color={userType === 'loaner' ? Colors.primary : Colors.textMuted}
              />
              <Text
                style={[
                  styles.userTypeBtnText,
                  userType === 'loaner' && styles.userTypeBtnTextActive,
                ]}
              >
                Borrower
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.userTypeBtn,
                userType === 'officer' && styles.userTypeBtnActive,
              ]}
              onPress={() => setUserType('officer')}
            >
              <Ionicons
                name="briefcase"
                size={20}
                color={userType === 'officer' ? Colors.primary : Colors.textMuted}
              />
              <Text
                style={[
                  styles.userTypeBtnText,
                  userType === 'officer' && styles.userTypeBtnTextActive,
                ]}
              >
                Officer
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Ionicons name="call-outline" size={20} color={Colors.primary} />
              <TextInput
                style={styles.phoneInput}
                placeholder="09XXXXXXXXX"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={11}
                editable={!loading}
                placeholderTextColor={Colors.textMuted}
              />
            </View>
          </View>

          {/* PIN Display */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>6-Digit PIN</Text>
            <View style={styles.pinDisplay}>
              {[...Array(6)].map((_, i) => (
                <View
                  key={i}
                  style={[styles.pinDot, i < pin.length && styles.pinDotFilled]}
                />
              ))}
            </View>
          </View>

          {/* PIN Pad */}
          <View style={styles.pinPad}>
            {pinButtons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.pinRow}>
                {row.map((button) => (
                  <TouchableOpacity
                    key={button}
                    style={[
                      styles.pinButton,
                      button === 'DEL' && styles.pinButtonDelete,
                    ]}
                    onPress={() => (button === 'DEL' ? handleBackspace() : handlePinPress(button))}
                    disabled={loading}
                  >
                    {button === 'DEL' ? (
                      <Ionicons name="backspace" size={20} color={Colors.primary} />
                    ) : (
                      <Text style={styles.pinButtonText}>{button}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, (phone.length < 10 || pin.length !== 6 || loading) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={phone.length < 10 || pin.length !== 6 || loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging in...' : 'Login with PIN'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Apply CTA Section */}
        <View style={styles.applySectionContainer}>
          <Text style={styles.applySectionLabel}>New applicant? Start your loan journey here.</Text>
          
          <Animated.View
            style={[
              styles.applyButtonWrapper,
              {
                transform: [{ scale: pulseScale }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/loan-application')}
            >
              <LinearGradient
                colors={['#00BCD4', '#0097A7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.applyButton}
              >
                <Text style={styles.applyButtonText}>Apply for a Loan →</Text>
                <Text style={styles.applyButtonSubtitle}>Free to apply · No hidden fees</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Powered By */}
      <View style={styles.poweredBy}>
        <Text style={styles.poweredByText}>Powered by RAFI × VERPTO</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.accent,
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  userTypeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    backgroundColor: Colors.backgroundSecondary,
    padding: 4,
    borderRadius: 12,
  },
  userTypeBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    flexDirection: 'row',
    gap: 8,
  },
  userTypeBtnActive: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userTypeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  userTypeBtnTextActive: {
    color: Colors.primary,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 10,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.borderLight,
  },
  pinDotFilled: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  pinPad: {
    marginBottom: 20,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
  pinButton: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  pinButtonDelete: {
    backgroundColor: Colors.backgroundSecondary,
  },
  pinButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  deleteText: {
    fontSize: 20,
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.primary,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  applySectionContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 12,
  },
  applySectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  applyButtonWrapper: {
    width: '100%',
  },
  applyButton: {
    marginHorizontal: 20,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.background,
  },
  applyButtonSubtitle: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.background,
    opacity: 0.85,
    marginTop: 2,
  },
  poweredBy: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  poweredByText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
