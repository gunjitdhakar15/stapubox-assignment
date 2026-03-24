// Design tokens from Figma
export const Colors = {
  // Backgrounds
  background: '#2C2C2C',
  surface: '#242424',
  surfaceLight: '#2F2F2F',
  card: '#232323',

  // Primary
  primary: '#008DFF',
  primaryDark: '#0070CC',
  primaryLight: '#339FFF',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#B4B4B8',
  textTertiary: '#8A8A8E',
  textPlaceholder: '#76767A',

  // Functional
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  // Borders & Dividers
  border: '#5A5A5A',
  borderLight: '#6A6A6A',
  divider: '#3B3B3D',

  // Input
  inputBackground: '#2A2A2A',
  inputBorder: '#606060',
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
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
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
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.textPrimary,
  },
  bodyMedium: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: Colors.textPrimary,
  },
  bodySemiBold: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    color: Colors.textPrimary,
  },

  // Small
  caption: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 15,
    color: Colors.textSecondary,
  },
  captionMedium: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 15,
    color: Colors.textSecondary,
  },

  // Labels
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
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
  screenPadding: 16,
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
