// ─── Modern Design System ────────────────────────────────────────────
// Premium theme tokens for the Patient App
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Color Palette ──────────────────────────────────────────────────
export const Colors = {
    // Primary
    primaryBlue: '#4A90E2',
    primaryDark: '#2563EB',
    primaryLight: '#93C5FD',
    primaryUltraLight: '#EFF6FF',

    // Accent — Teal/Cyan
    accent: '#06B6D4',
    accentLight: '#67E8F9',
    accentDark: '#0891B2',

    // Gradient stops
    gradientStart: '#4A90E2',
    gradientMid: '#667EEA',
    gradientEnd: '#764BA2',

    // Surfaces
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    surfaceTertiary: '#E2E8F0',

    // Text
    heading: '#0F172A',
    body: '#334155',
    paragraph: '#64748B',
    muted: '#94A3B8',
    placeholder: '#CBD5E1',

    // Semantic
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',

    // UI Elements
    white: '#FFFFFF',
    black: '#000000',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    divider: '#F1F5F9',
    disabled: '#CBD5E1',
    overlay: 'rgba(15, 23, 42, 0.6)',
    overlayLight: 'rgba(15, 23, 42, 0.3)',

    // Legacy compat
    lightBlue: '#DBEAFE',
    lighterBlue: '#EFF6FF',
    inputFill: '#F1F5F9',
    buttonBlue: '#4A90E2',
    checkboxActive: '#4A90E2',
    backgroundAlt: '#F1F5F9',
    cardShadow: 'rgba(71, 85, 105, 0.08)',

    // Glass effect
    glass: 'rgba(255, 255, 255, 0.85)',
    glassBorder: 'rgba(255, 255, 255, 0.4)',
    glassDark: 'rgba(15, 23, 42, 0.05)',
} as const;

// ─── Gradients (for LinearGradient or custom rendering) ─────────────
export const Gradients = {
    primary: ['#4A90E2', '#667EEA'],
    primaryFull: ['#4A90E2', '#667EEA', '#764BA2'],
    accent: ['#06B6D4', '#3B82F6'],
    warm: ['#F59E0B', '#EF4444'],
    success: ['#10B981', '#06B6D4'],
    dark: ['#1E293B', '#0F172A'],
    surface: ['#F8FAFC', '#EFF6FF'],
    hero: ['#4A90E2', '#667EEA', '#818CF8'],
} as const;

// ─── Typography ─────────────────────────────────────────────────────
export const Typography = StyleSheet.create({
    displayLarge: {
        fontSize: 32,
        fontWeight: '800' as const,
        color: Colors.heading,
        letterSpacing: -0.5,
        lineHeight: 40,
    },
    headlineLarge: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: Colors.heading,
        letterSpacing: -0.3,
        lineHeight: 32,
    },
    headlineMedium: {
        fontSize: 20,
        fontWeight: '600' as const,
        color: Colors.heading,
        letterSpacing: -0.2,
        lineHeight: 28,
    },
    headlineSmall: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: Colors.heading,
        lineHeight: 26,
    },
    bodyLarge: {
        fontSize: 16,
        fontWeight: '400' as const,
        color: Colors.body,
        lineHeight: 24,
    },
    bodyMedium: {
        fontSize: 15,
        fontWeight: '400' as const,
        color: Colors.paragraph,
        lineHeight: 22,
    },
    bodySmall: {
        fontSize: 13,
        fontWeight: '400' as const,
        color: Colors.paragraph,
        lineHeight: 20,
    },
    labelLarge: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: Colors.primaryBlue,
        lineHeight: 22,
    },
    labelMedium: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: Colors.primaryBlue,
        lineHeight: 18,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        color: Colors.muted,
        lineHeight: 16,
    },
    overline: {
        fontSize: 11,
        fontWeight: '700' as const,
        color: Colors.muted,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
        lineHeight: 16,
    },
    button: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: Colors.white,
        lineHeight: 22,
    },
    buttonSmall: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: Colors.white,
        lineHeight: 20,
    },
});

// ─── Spacing ────────────────────────────────────────────────────────
export const Spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
    section: 48,
} as const;

// ─── Border Radius ──────────────────────────────────────────────────
export const BorderRadius = {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    xxxl: 28,
    round: 999,
} as const;

// ─── Shadows ────────────────────────────────────────────────────────
export const Shadows = {
    xs: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    card: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
    },
    glow: {
        shadowColor: Colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
} as const;

// ─── Animation Durations ────────────────────────────────────────────
export const AnimationDuration = {
    fast: 150,
    normal: 250,
    slow: 400,
    entrance: 500,
    exit: 200,
} as const;

// ─── Screen Dimensions ─────────────────────────────────────────────
export const Screen = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    isSmall: SCREEN_WIDTH < 375,
    isMedium: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
    isLarge: SCREEN_WIDTH >= 414,
} as const;

// ─── Common Styles ──────────────────────────────────────────────────
export const CommonStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionPadding: {
        paddingHorizontal: Spacing.xl,
    },
    cardBase: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        ...Shadows.card,
    },
    glassCard: {
        backgroundColor: Colors.glass,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        padding: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.divider,
        marginVertical: Spacing.md,
    },
});
