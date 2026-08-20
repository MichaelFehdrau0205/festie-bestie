// Festie Bestie theme
// Design direction from PRD.md section 6: Spotify-like green palette, bold/bright text,
// iconography around speakers, sunglasses, wristbands.

export const colors = {
  background: '#0D0D0D',
  surface: '#181818',
  surfaceAlt: '#212121',
  primary: '#1ED760', // Spotify-style green
  primaryDark: '#169C46',
  text: '#FFFFFF',
  textMuted: '#B3B3B3',
  border: '#2A2A2A',
  danger: '#FF4D4D',
  chipBackground: '#1F3D2B',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 24,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800' as const, color: colors.text },
  h2: { fontSize: 24, fontWeight: '800' as const, color: colors.text },
  h3: { fontSize: 18, fontWeight: '700' as const, color: colors.text },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.text },
  bodyMuted: { fontSize: 14, fontWeight: '400' as const, color: colors.textMuted },
  label: { fontSize: 12, fontWeight: '700' as const, color: colors.textMuted, letterSpacing: 0.5 },
};
