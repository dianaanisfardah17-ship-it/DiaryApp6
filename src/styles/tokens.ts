import { Platform } from 'react-native';

export const COLORS = {
  background: '#F8F5FF',
  surface: '#FFFFFF',
  primary: '#A78BFA',
  secondary: '#C4B5FD',
  pink: '#FBCFE8',
  blue: '#BFDBFE',
  text: '#37304F',
  muted: '#938BA5',
  border: '#EDE7F6',
  danger: '#F472B6',
  success: '#A7DCC5',
  primarySoft: '#EEE6FF',
  pinkSoft: '#FCE7F3',
};

export const SPACE = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  small: 10,
  card: 18,
  large: 24,
  round: 100,
};

export const TYPO = {
  h1: 28,
  h2: 22,
  title: 17,
  body: 14,
  caption: 12,
};

// Menghilangkan garis fokus bawaan browser (kotak hitam) pada TextInput di web.
// Di Android/iOS tidak berpengaruh.
export const NO_OUTLINE = Platform.select({
  web: { outlineStyle: 'none', outlineWidth: 0 },
  default: {},
}) as object;

export const SHADOW = {
  card: {
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  soft: {
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
};