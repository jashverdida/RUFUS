/**
 * RUFUS Design System
 * Modern, accessible theme for the mobile loaner platform
 */

export const colors = {
  // Core Brand
  navy: '#0B3D91',
  teal: '#0099CC',
  cyan: '#00C9E0',
  navyDark: '#071F4A',
  
  // Surfaces
  white: '#FFFFFF',
  offWhite: '#F5F9FF',
  skyLight: '#EBF5FB',
  skyMid: '#D0EAF8',
  
  // Text
  textPrimary: '#0D1B2A',
  textSecondary: '#5A7A96',
  textMuted: '#8FA5BA',
  
  // Status Colors
  success: '#00A878',
  successBg: '#E6F7F3',
  warning: '#E8960C',
  warningBg: '#FEF3DC',
  danger: '#D63031',
  dangerBg: '#FDECEA',
  
  // UI
  infoBg: '#EBF5FB',
  border: '#D8EAF4',
  cardShadow: 'rgba(11, 61, 145, 0.08)',
};

export const typography = {
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.5,
  },
  sectionHead: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1.2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.navy,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 11,
    fontWeight: '400',
    color: colors.textMuted,
  },
};

export const cardStyle = {
  backgroundColor: colors.white,
  borderRadius: 20,
  padding: 20,
  shadowColor: colors.cardShadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 16,
  elevation: 4,
  marginBottom: 12,
};

export const smallCardStyle = {
  backgroundColor: colors.white,
  borderRadius: 16,
  padding: 16,
  shadowColor: colors.cardShadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 8,
  elevation: 2,
};

export const buttonStylePrimary = {
  backgroundColor: colors.teal,
  borderRadius: 12,
  paddingHorizontal: 24,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 44,
};

export const buttonStyleSecondary = {
  backgroundColor: colors.white,
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: colors.teal,
  paddingHorizontal: 24,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 44,
};

export const badgeStyle = {
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 100,
  fontSize: 10,
  fontWeight: '700',
  letterSpacing: 0.8,
};

export const tabBarStyle = {
  backgroundColor: colors.white,
  borderTopColor: colors.border,
  borderTopWidth: 1,
  height: 64,
  paddingBottom: 8,
  paddingTop: 4,
};

export default {
  colors,
  typography,
  cardStyle,
  smallCardStyle,
  buttonStylePrimary,
  buttonStyleSecondary,
  badgeStyle,
  tabBarStyle,
};
