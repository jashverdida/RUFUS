import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [statsVisible, setStatsVisible] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const countUpAnim1 = useRef(new Animated.Value(0)).current;
  const countUpAnim2 = useRef(new Animated.Value(0)).current;
  const countUpAnim3 = useRef(new Animated.Value(0)).current;

  const handleCountUp = () => {
    if (!statsVisible) {
      setStatsVisible(true);
      Animated.timing(countUpAnim1, {
        toValue: 3,
        duration: 1500,
        useNativeDriver: false,
      }).start();
      Animated.timing(countUpAnim2, {
        toValue: 74,
        duration: 1500,
        useNativeDriver: false,
      }).start();
      Animated.timing(countUpAnim3, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }
  };

  const countUpValue1 = countUpAnim1.interpolate({
    inputRange: [0, 3],
    outputRange: ['0', '3'],
  });

  const countUpValue2 = countUpAnim2.interpolate({
    inputRange: [0, 74],
    outputRange: ['0', '74'],
  });

  const handleScrollToSection = (sectionName) => {
    // Navigation logic for sections
    if (sectionName === 'action') {
      Alert.alert('RUFUS', 'See It In Action feature coming soon!');
    } else if (sectionName === 'contact') {
      // Scroll to contact section
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const copyEmail = (email) => {
    // Copy to clipboard functionality
    Alert.alert('Success', `${email} would be copied to clipboard`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <LinearGradient colors={['#0B3D91', '#0099CC', '#00C9E0']} style={styles.hero}>
          {/* Badge */}
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>✦ PSITE Innovation Challenge 2026</Text>
          </View>

          {/* Headline */}
          <Text style={styles.heroHeadline}>
            AI That Understands{'\n'}Your <Text style={styles.heroHeadlineItalic}>Tindahan.</Text>
          </Text>

          {/* Subheadline */}
          <Text style={styles.heroSubheadline}>
            RUFUS automates loan underwriting for Filipino micro-entrepreneurs — faster approvals,
            smarter credit.
          </Text>

          {/* Buttons */}
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => handleScrollToSection('action')}
            >
              <Text style={styles.btnPrimaryText}>See It In Action</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => handleScrollToSection('learn')}
            >
              <Text style={styles.btnSecondaryText}>Learn More ↓</Text>
            </TouchableOpacity>
          </View>

          {/* Phone Mockup Image or Fallback */}
          <View style={styles.phoneContainer}>
            {!imageLoadError ? (
              <Image
                source={require('../../assets/rufus-mobile-landing.png')}
                style={styles.heroPhone}
                onError={() => setImageLoadError(true)}
              />
            ) : (
              <LinearGradient
                colors={['#0B3D91', '#0099CC', '#00C9E0']}
                style={styles.phoneFallback}
              >
                <Text style={styles.phoneFallbackText}>RUFUS</Text>
              </LinearGradient>
            )}
          </View>
        </LinearGradient>

        {/* ============================================
            PARALLAX TEXT SECTION
            ============================================ */}
        <View style={styles.parallaxSection}>
          <Text style={styles.parallaxText}>
            MICRO{'\n'}FINANCE
          </Text>
        </View>

        {/* ============================================
            PROBLEM SECTION
            ============================================ */}
        <View style={styles.problemSection}>
          <Text style={styles.sectionHeadline}>Loan applications shouldn't feel like this.</Text>

          <View style={styles.problemCards}>
            <View style={[styles.problemCard, { borderLeftColor: '#E74C3C' }]}>
              <Text style={styles.problemCardTitle}>🗂️ Hours of Manual Review</Text>
              <Text style={styles.problemCardText}>
                Loan officers spend days sorting through paper documents and spreadsheets.
              </Text>
            </View>

            <View style={[styles.problemCard, { borderLeftColor: '#F39C12' }]}>
              <Text style={styles.problemCardTitle}>⏳ SMEs Wait Weeks</Text>
              <Text style={styles.problemCardText}>
                Small business owners can't afford to wait. Every day without capital is a day lost.
              </Text>
            </View>

            <View style={[styles.problemCard, { borderLeftColor: colors.teal }]}>
              <Text style={styles.problemCardTitle}>❓ Guesswork Credit Scoring</Text>
              <Text style={styles.problemCardText}>
                Manual assessment means inconsistent decisions and missed opportunities.
              </Text>
            </View>
          </View>
        </View>

        {/* ============================================
            SOLUTION SECTION
            ============================================ */}
        <LinearGradient
          colors={['#0B3D91', '#005F8A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.solutionSection}
        >
          <View style={styles.solutionBadge}>
            <Text style={styles.solutionBadgeText}>⚡ Powered by AI</Text>
          </View>
          <Text style={[styles.sectionHeadline, styles.sectionHeadlineWhite]}>
            RUFUS changes everything.
          </Text>

          <View style={styles.featureRows}>
            <View style={styles.featureRow}>
              <Text style={styles.featureTitle}>🧠 AI Credit Scoring</Text>
              <Text style={styles.featureText}>
                Automatically analyzes business plans, financial statements, and payment history
                into a single RUFUS Score.
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureTitle}>📄 Digital Document Pipeline</Text>
              <Text style={styles.featureText}>
                SMEs submit everything from their phone. No more paper. No more lost documents.
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureTitle}>⚡ Smart Underwriting Queue</Text>
              <Text style={styles.featureText}>
                Auto-sorts applications by risk level so officers can mass-approve low-risk
                clients in minutes.
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* ============================================
            STATS SECTION
            ============================================ */}
        <View style={styles.statsSection} onLayout={handleCountUp}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{Math.floor(countUpAnim1.__getValue())}x</Text>
              <Text style={styles.statLabel}>Faster{'\n'}approvals</Text>
            </View>

            <View style={[styles.statItem, styles.statItemBorder]}>
              <Text style={styles.statNumber}>{Math.floor(countUpAnim2.__getValue())}%</Text>
              <Text style={styles.statLabel}>Accuracy{'\n'}rate</Text>
            </View>

            <View style={[styles.statItem, styles.statItemBorder]}>
              <Text style={styles.statNumber}>₱0</Text>
              <Text style={styles.statLabel}>Paper{'\n'}needed</Text>
            </View>
          </View>
        </View>

        {/* ============================================
            TEAM SECTION
            ============================================ */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionHeadline}>Built by VERPTO.</Text>
          <Text style={styles.teamSubtext}>
            A team of student developers from the Philippines, building real solutions for real
            communities.
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teamScroll}>
            {/* Team Member 1 */}
            <View style={styles.teamCard}>
              <LinearGradient
                colors={['#0099CC', '#0B3D91']}
                style={styles.teamAvatar}
              >
                <Text style={styles.teamAvatarText}>JV</Text>
              </LinearGradient>
              <Text style={styles.teamName}>Jashmine Verdida</Text>
              <Text style={styles.teamRole}>Lead Developer & UI/UX</Text>
              <Text style={styles.teamEmail}>JashmineVerdida08@gmail.com</Text>
              <TouchableOpacity onPress={() => copyEmail('JashmineVerdida08@gmail.com')}>
                <Text style={styles.teamEmailLink}>Copy Email</Text>
              </TouchableOpacity>
            </View>

            {/* Team Member 2 */}
            <View style={styles.teamCard}>
              <LinearGradient colors={['#0099CC', '#0B3D91']} style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>EP</Text>
              </LinearGradient>
              <Text style={styles.teamName}>Eijay Pepito</Text>
              <Text style={styles.teamRole}>AI & Backend Engineer</Text>
              <Text style={styles.teamEmail}>eijay.pepito8@gmail.com</Text>
              <TouchableOpacity onPress={() => copyEmail('eijay.pepito8@gmail.com')}>
                <Text style={styles.teamEmailLink}>Copy Email</Text>
              </TouchableOpacity>
            </View>

            {/* Team Member 3 */}
            <View style={styles.teamCard}>
              <LinearGradient colors={['#0099CC', '#0B3D91']} style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>YB</Text>
              </LinearGradient>
              <Text style={styles.teamName}>Yado Beligaño</Text>
              <Text style={styles.teamRole}>Systems Architect</Text>
              <Text style={styles.teamEmail}>LordChristian88@gmail.com</Text>
              <TouchableOpacity onPress={() => copyEmail('LordChristian88@gmail.com')}>
                <Text style={styles.teamEmailLink}>Copy Email</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* ============================================
            CONTACT SECTION
            ============================================ */}
        <LinearGradient colors={['#0B3D91', '#0B3D91']} style={styles.contactSection}>
          <Text style={[styles.sectionHeadline, styles.sectionHeadlineWhite]}>
            Let's talk microfinance.
          </Text>
          <Text style={styles.contactSubtext}>Questions about RUFUS? Reach out to the team.</Text>

          <View style={styles.contactLinks}>
            <TouchableOpacity
              style={styles.contactLink}
              onPress={() => copyEmail('JashmineVerdida08@gmail.com')}
            >
              <Ionicons name="mail" size={16} color="white" />
              <Text style={styles.contactLinkText}>JashmineVerdida08@gmail.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactLink}
              onPress={() => copyEmail('eijay.pepito8@gmail.com')}
            >
              <Ionicons name="mail" size={16} color="white" />
              <Text style={styles.contactLinkText}>eijay.pepito8@gmail.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactLink}
              onPress={() => copyEmail('LordChristian88@gmail.com')}
            >
              <Ionicons name="mail" size={16} color="white" />
              <Text style={styles.contactLinkText}>LordChristian88@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ============================================
            FOOTER
            ============================================ */}
        <View style={styles.footer}>
          <Text style={styles.footerWordmark}>RUFUS</Text>
          <Text style={styles.footerText}>RAFI Unified Financial Underwriting System</Text>
          <Text style={styles.footerText}>Created by VERPTO · 2026</Text>
          <Text style={styles.footerText}>PSITE Central Visayas Innovation Challenge</Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>
            Built for RAFI microfinance communities across the Philippines.
          </Text>
        </View>

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
  hero: {
    minHeight: height * 1.1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },

  heroBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  heroHeadline: {
    fontSize: 44,
    fontWeight: '800',
    fontFamily: 'Syne',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 52,
  },

  heroHeadlineItalic: {
    fontStyle: 'italic',
    fontSize: 38,
    position: 'relative',
  },

  heroSubheadline: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 32,
    lineHeight: 22,
  },

  heroButtons: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
    gap: 12,
  },

  btnPrimary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 5,
  },

  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: '#0B3D91',
  },

  btnSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'white',
    alignItems: 'center',
  },

  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: 'white',
  },

  phoneContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  heroPhone: {
    width: 280,
    height: 560,
    borderRadius: 40,
    resizeMode: 'contain',
    shadowColor: 'rgba(0,201,224,0.4)',
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 1,
    shadowRadius: 64,
    elevation: 10,
  },

  phoneFallback: {
    width: 280,
    height: 560,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: 'white',
  },

  phoneFallbackText: {
    fontSize: 48,
    fontWeight: '800',
    fontFamily: 'Syne',
    color: 'white',
  },

  /* ============================================
     PARALLAX SECTION
     ============================================ */
  parallaxSection: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,201,224,0.05)',
  },

  parallaxText: {
    fontSize: 100,
    fontWeight: '800',
    fontFamily: 'Syne',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 110,
  },

  /* ============================================
     PROBLEM SECTION
     ============================================ */
  problemSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  sectionHeadline: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: '#0B3D91',
    textAlign: 'center',
    marginBottom: 40,
  },

  sectionHeadlineWhite: {
    color: 'white',
  },

  problemCards: {
    gap: 16,
  },

  problemCard: {
    backgroundColor: 'white',
    borderLeftWidth: 4,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: 'rgba(0,99,153,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 2,
  },

  problemCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: '#0B3D91',
    marginBottom: 8,
  },

  problemCardText: {
    fontSize: 13,
    color: '#5A7A96',
    lineHeight: 20,
  },

  /* ============================================
     SOLUTION SECTION
     ============================================ */
  solutionSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  solutionBadge: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 100,
    marginBottom: 16,
  },

  solutionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00C9E0',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  featureRows: {
    gap: 16,
  },

  featureRow: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#0099CC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: 'white',
    marginBottom: 8,
  },

  featureText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },

  /* ============================================
     STATS SECTION
     ============================================ */
  statsSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 350,
    alignSelf: 'center',
  },

  statItem: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
  },

  statItemBorder: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,153,204,0.2)',
  },

  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    fontFamily: 'Syne',
    color: '#0B3D91',
    marginBottom: 8,
  },

  statLabel: {
    fontSize: 11,
    fontWeight: '300',
    color: '#5A7A96',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* ============================================
     TEAM SECTION
     ============================================ */
  teamSection: {
    backgroundColor: '#E8F6FB',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  teamSubtext: {
    fontSize: 13,
    color: '#5A7A96',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },

  teamScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },

  teamCard: {
    width: width * 0.55,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    marginRight: 12,
    shadowColor: 'rgba(0,99,153,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 2,
  },

  teamAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  teamAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: 'white',
  },

  teamName: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: '#0B3D91',
    marginBottom: 4,
  },

  teamRole: {
    fontSize: 10,
    color: '#0099CC',
    marginBottom: 12,
    textAlign: 'center',
  },

  teamEmail: {
    fontSize: 10,
    color: '#5A7A96',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 14,
  },

  teamEmailLink: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0099CC',
    marginTop: 4,
  },

  /* ============================================
     CONTACT SECTION
     ============================================ */
  contactSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  contactSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 32,
  },

  contactLinks: {
    gap: 12,
  },

  contactLink: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#0099CC',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  contactLinkText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },

  /* ============================================
     FOOTER
     ============================================ */
  footer: {
    backgroundColor: '#050F1C',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },

  footerWordmark: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Syne',
    color: 'white',
    marginBottom: 8,
  },

  footerText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 18,
    textAlign: 'center',
  },

  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    marginVertical: 12,
  },
});
