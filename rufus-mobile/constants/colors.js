export const Colors = {
  primary: '#1A6EDB',
  primaryLight: '#EBF2FF',
  cyan: '#00C2D1',
  cyanLight: '#E6F9FA',
  green: '#00C896',
  greenLight: '#E6FAF5',
  amber: '#F4A124',
  amberLight: '#FEF6E7',
  red: '#EF4444',
  redLight: '#FEF2F2',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  white: '#ffffff',
};

export const getScoreColor = (score) => {
  if (score > 80) return { stroke: Colors.green, text: Colors.green };
  if (score >= 50) return { stroke: Colors.amber, text: Colors.amber };
  return { stroke: Colors.red, text: Colors.red };
};

export const getStatusColors = (status) => {
  switch (status) {
    case 'Pre-Approved':
      return { bg: Colors.greenLight, text: Colors.green };
    case 'Review Needed':
    case 'Needs Manual Review':
      return { bg: Colors.amberLight, text: Colors.amber };
    case 'Pending AI':
    case 'Pending':
      return { bg: Colors.primaryLight, text: Colors.primary };
    case 'Declined':
      return { bg: Colors.redLight, text: Colors.red };
    default:
      return { bg: Colors.slate100, text: Colors.slate600 };
  }
};
