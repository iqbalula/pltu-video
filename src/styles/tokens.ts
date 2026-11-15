// Design tokens with inline-style hex values (no Tailwind) - Bumi-compatible
export const colors = {
  // Dark backgrounds
  bg: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#020617',
  },
  
  // Accent colors
  accent: {
    blue: '#38bdf8',
    cyan: '#06b6d4',
    emerald: '#10b981',
    green: '#22c55e',
    amber: '#f59e0b',
    orange: '#f97316',
    red: '#ef4444',
    pink: '#ec4899',
    purple: '#a855f7',
    gold: '#fbbf24',
  },
  
  // Text colors
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    muted: '#64748b',
    accent: '#fbbf24',
    onDark: '#0f172a',
  },
  
  // UI colors (SceneCard, HookScene, CTAScene need these)
  ui: {
    cardBg: 'rgba(30, 41, 59, 0.85)',
    cardBorder: '#334155',
    buttonBg: '#15803d',
    buttonHover: '#22c55e',
    glowBlue: 'rgba(56, 189, 248, 0.4)',
    glowGreen: 'rgba(34, 197, 94, 0.4)',
    glowAmber: 'rgba(251, 191, 36, 0.4)',
  },
  
  // PLTU-specific scene colors
  scene: {
    hook: '#38bdf8',
    demin: '#06b6d4',
    boiler: '#f97316',
    esp: '#a855f7',
    steam: '#38bdf8',
    turbine: '#10b981',
    trafo: '#fbbf24',
    cta: '#ef4444',
  },
  
  // Glow effects
  glow: {
    cyan: 'rgba(56, 189, 248, 0.6)',
    teal: 'rgba(6, 182, 212, 0.5)',
    orange: 'rgba(249, 115, 22, 0.6)',
    purple: 'rgba(168, 85, 247, 0.5)',
    emerald: 'rgba(16, 185, 129, 0.5)',
    amber: 'rgba(251, 191, 36, 0.6)',
    rose: 'rgba(239, 68, 68, 0.5)',
  },
  
  // Primary colors
  primary: {
    cyan: '#38bdf8',
    teal: '#06b6d4',
    orange: '#f97316',
    amber: '#fbbf24',
    emerald: '#10b981',
    purple: '#a855f7',
    rose: '#ef4444',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const typography = {
  fonts: {
    arabic: 'Amiri, Scheherazade New, serif',
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.875rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
    '5xl': '3.75rem',
    '6xl': '4.5rem',
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const animation = {
  durations: {
    fast: 200,
    normal: 400,
    slow: 600,
    slower: 1000,
  },
  easings: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const layout = {
  width: 1080,
  height: 1920,
  safeArea: {
    top: 150,
    bottom: 200,
    left: 80,
    right: 80,
  },
  card: {
    width: 880,
    height: 200,
    radius: 16,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },
};

export const videoMeta = {
  title: 'Proses Kerja PLTU',
  subtitle: 'Dari Batubara Menjadi Listrik',
  duration: 100.61,
  fps: 30,
  width: 1080,
  height: 1920,
  totalFrames: 3018,
  hashtags: ['#pltu', '#listrik', '#energi', '#edukasi', '#teknik', '#batubara', '#pembangkitan', '#indonesia'],
};
