// Design tokens from Figma
export const Colors = {
  // Backgrounds
  background: '#2f2f2f',
  surface: '#3a3a3a',
  surfaceLight: '#f5f5f5',
  card: '#353535',

  // Primary
  primary: '#008DFF',
  primaryDark: '#0070CC',
  primaryLight: '#339FFF',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#f1f1f1',
  textTertiary: '#b8b8b8',
  textPlaceholder: '#7f7f7f',

  // Functional
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  // Borders & Dividers
  border: '#7a7a7a',
  borderLight: '#9a9a9a',
  divider: '#4f4f4f',

  // Input
  inputBackground: '#2f2f2f',
  inputBorder: '#7a7a7a',
  inputBorderFocused: '#008DFF',

  // Button
  buttonDisabled: '#3b3b3b',
  buttonDisabledText: '#6f6f6f',

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
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  captionMedium: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    color: Colors.textSecondary,
  },

  // Labels
  label: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    color: Colors.textPrimary,
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
    color: Colors.textPrimary,
  },

  // Button
  button: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
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
  screenPadding: 20,
};

export const BorderRadius = {
  sm: 6,
  md: 6,
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
