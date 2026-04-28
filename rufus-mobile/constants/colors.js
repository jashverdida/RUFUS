export const Colors = {
  primary: '#2563eb',
  primaryLight: '#eff6ff',
  green: '#16a34a',
  greenLight: '#f0fdf4',
  yellow: '#ca8a04',
  yellowLight: '#fefce8',
  red: '#dc2626',
  redLight: '#fef2f2',
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
  if (score >= 50) return { stroke: Colors.yellow, text: Colors.yellow };
  return { stroke: Colors.red, text: Colors.red };
};

export const getStatusColors = (status) => {
  switch (status) {
    case 'Pre-Approved':
      return { bg: Colors.greenLight, text: Colors.green };
    case 'Review Needed':
    case 'Needs Manual Review':
      return { bg: Colors.yellowLight, text: Colors.yellow };
    case 'Pending AI':
    case 'Pending':
      return { bg: Colors.primaryLight, text: Colors.primary };
    default:
      return { bg: Colors.slate100, text: Colors.slate600 };
  }
};
