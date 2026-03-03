// Animated Header — curved gradient-style header with pattern overlay
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../../config/theme';

interface AnimatedHeaderProps {
    children: React.ReactNode;
    height?: number;
    backgroundColor?: string;
    style?: ViewStyle;
}

export default function AnimatedHeader({
    children,
    height = 220,
    backgroundColor = Colors.primaryBlue,
    style,
}: AnimatedHeaderProps) {
    return (
        <View style={[styles.container, { height }, style]}>
            {/* Base gradient simulation via layers */}
            <View style={[styles.baseLayer, { backgroundColor }]} />
            <View style={[styles.overlayLayer, { backgroundColor: 'rgba(102, 126, 234, 0.4)' }]} />

            {/* Decorative circles */}
            <View style={[styles.circle, styles.circleTopRight]} />
            <View style={[styles.circle, styles.circleBottomLeft]} />
            <View style={[styles.circleSmall, styles.circleSmallRight]} />

            {/* Bottom curve */}
            <View style={styles.curveWrapper}>
                <View style={styles.curve} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden',
    },
    baseLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    overlayLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    circle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    circleTopRight: {
        top: -60,
        right: -40,
    },
    circleBottomLeft: {
        bottom: -80,
        left: -60,
    },
    circleSmall: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    circleSmallRight: {
        top: 60,
        right: 80,
    },
    curveWrapper: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 30,
        overflow: 'hidden',
    },
    curve: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.lg,
        zIndex: 1,
    },
});
