// Design tokens from Figma
export const Colors = {
  // Backgrounds
  background: '#121212',
  surface: '#1E1E1E',
  surfaceLight: '#2A2A2A',
  card: '#1C1C1E',

  // Primary
  primary: '#008DFF',
  primaryDark: '#0070CC',
  primaryLight: '#339FFF',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#6C6C70',
  textPlaceholder: '#636366',

  // Functional
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  // Borders & Dividers
  border: '#3A3A3C',
  borderLight: '#48484A',
  divider: '#2C2C2E',

  // Input
  inputBackground: '#1C1C1E',
  inputBorder: '#3A3A3C',
  inputBorderFocused: '#008DFF',

  // Button
  buttonDisabled: '#2A2A2A',
  buttonDisabledText: '#636366',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const Typography = {
  // Headlines
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: Colors.textPrimary,
  },

  // Body
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  bodySemiBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: Colors.textPrimary,
  },

  // Small
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  captionMedium: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: Colors.textSecondary,
  },

  // Labels
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.textSecondary,
  },

  // Button
  button: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screenPadding: 24,
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  round: 100,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};
