import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Alert,
  ImageBackground,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* ============================================
            HERO SECTION WITH LOGO AND GRADIENT OVERLAY
            ============================================ */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require('../assets/rufus-mobile-landing.png')}
            style={styles.heroImage}
            resizeMode="cover"
          >
            {/* Dark gradient overlay: semi-transparent at top, dark navy at bottom */}
            <LinearGradient
              colors={['rgba(26, 35, 126, 0.2)', 'rgba(26, 35, 126, 0.7)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.heroOverlay}
            >
              {/* RUFUS Logo - Centered at Top */}
              <View style={styles.heroLogoContainer}>
                <Image
                  source={require('../assets/rufus-logo.png')}
                  style={styles.heroLogo}
                  resizeMode="contain"
                />
              </View>

              {/* Main Content: Tagline and Heading */}
              <View style={styles.heroContentContainer}>
                {/* Tagline */}
                <Text style={styles.heroTagline}>Your loan. Your way. Simplified.</Text>

                {/* Main Heading - Frosted Glass Effect */}
                <View style={styles.frostedGlassStrip}>
                  <Text style={styles.heroHeading}>
                    AI-Powered Loan Underwriting for Filipino Micro-Entrepreneurs
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* ============================================
            FEATURES SECTION
            ============================================ */}
        <View style={styles.section}>
          <View style={styles.featureGrid}>
            {/* Feature 1 */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="flash" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Faster Approvals</Text>
              <Text style={styles.featureDesc}>AI-driven decisions in minutes, not days</Text>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="trending-up" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Smarter Credit</Text>
              <Text style={styles.featureDesc}>Accurate risk assessment for all</Text>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="shield-checkmark" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Fair & Transparent</Text>
              <Text style={styles.featureDesc}>Clear terms everyone can understand</Text>
            </View>
          </View>
        </View>

        {/* ============================================
            ABOUT SECTION WITH GRADIENT & INVERTED CTA
            ============================================ */}
        <LinearGradient
          colors={['#1A237E', '#00BCD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aboutSection}
        >
          <Text style={styles.aboutTitle}>About RUFUS</Text>
          <Text style={styles.aboutText}>
            RUFUS (RAFI Unified Financial Underwriting System) is revolutionizing microfinance across
            the Philippines. We combine AI technology with human insight to provide faster, fairer
            loan approvals for Filipino entrepreneurs building their dreams.
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.ctaButtonText}>Get Started Now</Text>
            <Ionicons name="arrow-forward" size={16} color="#1A237E" />
          </TouchableOpacity>
        </LinearGradient>

        {/* ============================================
            TEAM & CREATORS SECTION
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionSmallLabel}>CREATED BY</Text>
          <Text style={styles.sectionTitle}>Meet the Team Behind RUFUS</Text>

          <View style={styles.teamContainer}>
            {/* Team Member 1 */}
            <View style={styles.teamMemberCard}>
              <LinearGradient
                colors={['#00BCD4', '#1A237E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.memberInitial}
              >
                <Text style={styles.memberInitialText}>JV</Text>
              </LinearGradient>
              <Text style={styles.memberName}>Jashmine Verdida</Text>
              <Text style={styles.memberRole}>Founder & Lead Developer</Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Contact', 'JashmineVerdida08@gmail.com')}
              >
                <Text style={styles.memberEmail}>JashmineVerdida08@gmail.com</Text>
              </TouchableOpacity>
            </View>

            {/* Team Member 2 */}
            <View style={styles.teamMemberCard}>
              <LinearGradient
                colors={['#00BCD4', '#1A237E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.memberInitial}
              >
                <Text style={styles.memberInitialText}>EP</Text>
              </LinearGradient>
              <Text style={styles.memberName}>Eijay Pepito</Text>
              <Text style={styles.memberRole}>Creative Director & Developer</Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Contact', 'eijay.pepito8@gmail.com')}
              >
                <Text style={styles.memberEmail}>eijay.pepito8@gmail.com</Text>
              </TouchableOpacity>
            </View>

            {/* Team Member 3 */}
            <View style={styles.teamMemberCard}>
              <LinearGradient
                colors={['#00BCD4', '#1A237E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.memberInitial}
              >
                <Text style={styles.memberInitialText}>YB</Text>
              </LinearGradient>
              <Text style={styles.memberName}>Yado Beligaño</Text>
              <Text style={styles.memberRole}>Strategy & Operations</Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Contact', 'LordChristian88@gmail.com')}
              >
                <Text style={styles.memberEmail}>LordChristian88@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ============================================
            FOOTER / CREDITS
            ============================================ */}
        <LinearGradient
          colors={['#0B1929', '#0B3D91']}
          style={styles.footer}
        >
          <View style={styles.verptyCredit}>
            <Image
              source={require('../assets/VERPTO-logo.png')}
              style={styles.verptoLogoSmall}
              resizeMode="contain"
            />
            <Text style={styles.verptoText}>Created by VERPTO</Text>
          </View>

          <Text style={styles.footerTagline}>"Your loan. Your way. Simplified."</Text>

          <View style={styles.footerContactSection}>
            <Text style={styles.footerContactLabel}>GET IN TOUCH</Text>
            <TouchableOpacity
              style={styles.footerContactItem}
              onPress={() => Alert.alert('Email', 'JashmineVerdida08@gmail.com')}
            >
              <Ionicons name="mail" size={16} color="#00C9E0" style={{ marginRight: 10 }} />
              <Text style={styles.footerContactText}>JashmineVerdida08@gmail.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerContactItem}
              onPress={() => Alert.alert('Email', 'eijay.pepito8@gmail.com')}
            >
              <Ionicons name="mail" size={16} color="#00C9E0" style={{ marginRight: 10 }} />
              <Text style={styles.footerContactText}>eijay.pepito8@gmail.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerContactItem}
              onPress={() => Alert.alert('Email', 'LordChristian88@gmail.com')}
            >
              <Ionicons name="mail" size={16} color="#00C9E0" style={{ marginRight: 10 }} />
              <Text style={styles.footerContactText}>LordChristian88@gmail.com</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerDivider} />

          <View style={styles.footerCredits}>
            <Image
              source={require('../assets/rufus-logo.png')}
              style={styles.rufusLogoSmall}
              resizeMode="contain"
            />
            <Text style={styles.footerCreditText}>
              RUFUS - RAFI Unified Financial Underwriting System
            </Text>
            <Text style={styles.footerCreditText}>
              Powering microfinance across the Philippines
            </Text>
            <Text style={styles.footerCreditText}>© 2026 All Rights Reserved</Text>
          </View>
        </LinearGradient>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ============================================
     HERO SECTION
     ============================================ */
  heroContainer: {
    position: 'relative',
    height: 520,
    overflow: 'hidden',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 60,
  },

  heroLogoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  heroLogo: {
    width: 80,
    height: 80,
  },

  heroContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },

  heroTagline: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 24,
    letterSpacing: 0.5,
  },

  frostedGlassStrip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  heroHeading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
  },

  /* ============================================
     FEATURE SECTION
     ============================================ */
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  sectionSmallLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00BCD4',
    letterSpacing: 2,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 32,
    lineHeight: 36,
  },

  featureGrid: {
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },

  featureCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#00BCD4',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },

  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 8,
    textAlign: 'center',
  },

  featureDesc: {
    fontSize: 12,
    fontWeight: '400',
    color: '#555555',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* ============================================
     ABOUT SECTION
     ============================================ */
  aboutSection: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  aboutTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },

  aboutText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 26,
    marginBottom: 28,
  },

  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  ctaButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A237E',
  },

  /* ============================================
     TEAM SECTION
     ============================================ */
  teamContainer: {
    gap: 12,
  },

  teamMemberCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#00BCD4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  memberInitial: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  memberInitialText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 4,
  },

  memberRole: {
    fontSize: 12,
    fontWeight: '400',
    color: '#00BCD4',
    marginBottom: 12,
  },

  memberEmail: {
    fontSize: 11,
    fontWeight: '400',
    color: '#00BCD4',
  },

  /* ============================================
     FOOTER
     ============================================ */
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },

  verptyCredit: {
    alignItems: 'center',
    marginBottom: 16,
  },

  verptoLogoSmall: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },

  verptoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  footerTagline: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },

  footerContactSection: {
    width: '100%',
    marginBottom: 24,
  },

  footerContactLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00BCD4',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },

  footerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },

  footerContactText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#FFFFFF',
    flex: 1,
  },

  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 24,
  },

  footerCredits: {
    alignItems: 'center',
  },

  rufusLogoSmall: {
    width: 50,
    height: 50,
    marginBottom: 12,
  },

  footerCreditText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 4,
  },
});
