export const Colors = {
  // Core Brand Colors - White & Blue Design Language
  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F4F8FF',   // very light blue-tinted white
  backgroundTertiary: '#EAF1FB',    // light blue wash (cards, sections)
  
  // Primary Blue (main brand color)
  primary: '#1A4FA3',               // deep navy-blue
  primaryLight: '#2B6FD4',          // bright blue
  primaryLighter: '#5B8FE8',        // light blue
  
  // Teal Accent (secondary brand color)
  accent: '#17C5CB',                // teal-cyan
  accentLight: '#4DD9DC',           // light accent
  accentLighter: '#E0F9FA',         // very light teal
  
  // Text - on white backgrounds
  textPrimary: '#0D1B3E',           // near-black navy
  textSecondary: '#4A6FA5',         // muted blue-gray
  textMuted: '#8FA8CC',             // hint/placeholder text
  
  // Status Colors
  success: '#1A9E6A',
  successBg: '#E8F7F1',
  warning: '#E07B00',
  warningBg: '#FEF3E2',
  danger: '#C0392B',
  dangerBg: '#FDECEA',
  info: '#2B6FD4',
  infoBg: '#EAF1FB',
  
  // Borders
  borderLight: '#D6E4F7',           // light blue-tinted border
  borderMid: '#B3CCF0',
  
  // Navigation
  navBackground: '#FFFFFF',
  navActive: '#1A4FA3',             // active tab = primary blue
  navInactive: '#8FA8CC',
  
  // Legacy/Alias support for existing components
  cyan: '#17C5CB',
  green: '#1A9E6A',
  greenLight: '#E8F7F1',
  amber: '#E07B00',
  amberLight: '#FEF3E2',
  red: '#C0392B',
  redLight: '#FDECEA',
  
  // Neutral colors (deprecated but kept for compatibility)
  slate900: '#0D1B3E',
  slate800: '#1E293B',
  slate700: '#4A6FA5',
  slate600: '#4A6FA5',
  slate500: '#8FA8CC',
  slate400: '#8FA8CC',
  slate300: '#D6E4F7',
  slate200: '#E2E8F0',
  slate100: '#F4F8FF',
  slate50: '#F8FAFC',
  white: '#FFFFFF',
};

export const getScoreColor = (score) => {
  if (score > 80) return { stroke: Colors.success, text: Colors.success };
  if (score >= 50) return { stroke: Colors.warning, text: Colors.warning };
  return { stroke: Colors.danger, text: Colors.danger };
};

export const getStatusColors = (status) => {
  switch (status) {
    case 'Pre-Approved':
      return { bg: Colors.successBg, text: Colors.success };
    case 'Review Needed':
    case 'Needs Manual Review':
      return { bg: Colors.warningBg, text: Colors.warning };
    case 'Pending AI':
    case 'Pending':
      return { bg: Colors.infoBg, text: Colors.info };
    case 'Declined':
      return { bg: Colors.dangerBg, text: Colors.danger };
    default:
      return { bg: Colors.backgroundSecondary, text: Colors.textSecondary };
  }
};
