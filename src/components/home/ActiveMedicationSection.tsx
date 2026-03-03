// Active Medication Section — Modern Design
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../store';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../config/theme';
import FlutterSvgIcon from '../common/FlutterSvgIcon';

export default function ActiveMedicationSection() {
    const { activeMedications } = useAppSelector((state) => state.medications);

    if (activeMedications.length === 0) return null;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.titleRow}>
                    <View style={[styles.titleDot, { backgroundColor: Colors.success }]} />
                    <Text style={styles.sectionTitle}>Active Medications</Text>
                </View>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{activeMedications.length}</Text>
                </View>
            </View>

            {activeMedications.slice(0, 5).map((med, index) => {
                const isActive = (med.status || '').toLowerCase() === 'active';
                return (
                    <View key={`${med?.id ?? 'med'}-${index}`} style={styles.card}>
                        <View style={[styles.pillIcon, isActive ? styles.pillActive : styles.pillInactive]}>
                            <FlutterSvgIcon name="medicine" size={18} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.medName}>{med.name}</Text>
                            <View style={styles.detailRow}>
                                <View style={styles.detailChip}>
                                    <Text style={styles.chipText}>{med.dosage}</Text>
                                </View>
                                <View style={styles.detailChip}>
                                    <Text style={styles.chipText}>{med.frequency}</Text>
                                </View>
                            </View>
                            {med.instructions && (
                                <Text style={styles.instructions}>{med.instructions}</Text>
                            )}
                        </View>
                        <View style={styles.statusIndicator}>
                            <FlutterSvgIcon
                                name={isActive ? 'verified' : 'false'}
                                size={18}
                            />
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: Spacing.xxl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    titleDot: {
        width: 4,
        height: 20,
        borderRadius: 2,
    },
    sectionTitle: {
        ...Typography.headlineSmall,
        fontSize: 17,
    },
    countBadge: {
        backgroundColor: Colors.successLight,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: BorderRadius.round,
    },
    countText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.success,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        alignItems: 'flex-start',
        ...Shadows.sm,
    },
    pillIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    pillActive: {
        backgroundColor: Colors.successLight,
    },
    pillInactive: {
        backgroundColor: Colors.surfaceSecondary,
    },
    content: {
        flex: 1,
    },
    medName: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.heading,
        marginBottom: 6,
    },
    detailRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 4,
    },
    detailChip: {
        backgroundColor: Colors.surfaceSecondary,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: BorderRadius.sm,
    },
    chipText: {
        fontSize: 11,
        fontWeight: '500',
        color: Colors.paragraph,
    },
    instructions: {
        ...Typography.caption,
        fontStyle: 'italic',
        marginTop: 4,
    },
    statusIndicator: {
        paddingLeft: 8,
        paddingTop: 4,
    },
});
