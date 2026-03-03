// Appointment History Screen — Matching user screenshot
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAppointmentHistory } from '../../store/slices/appointmentsSlice';
import { Colors } from '../../config/theme';
import { ROUTES } from '../../config/constants';
import FlutterSvgIcon from '../../components/common/FlutterSvgIcon';

export default function AppointmentHistoryScreen({ navigation }: any) {
    const dispatch = useAppDispatch();
    const { history, loading } = useAppSelector((state) => state.appointments);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (history.length === 0) {
            dispatch(fetchAppointmentHistory());
        }
    }, [dispatch, history.length]);

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchAppointmentHistory());
        setRefreshing(false);
    };

    const handleViewPrescription = useCallback((appointment: any) => {
        const pdfUrl = appointment?.consultationPdfLink;
        if (!pdfUrl) {
            Alert.alert('Prescription Unavailable', 'No prescription PDF found for this appointment.');
            return;
        }

        navigation.navigate(ROUTES.PDF_VIEWER, {
            consultationId: appointment?.consultationId || appointment?.id,
            pdfUrl,
            clinicId: appointment?.clinicId,
            patientId: appointment?.patientId,
            fileKey: appointment?.fileKey,
            prescription: {
                doctorName: appointment?.doctorName || 'N/A',
            },
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: any }) => {
        const status = (item.status || '').toLowerCase();
        let statusColor = '#9E9E9E'; // default gray
        let displayStatus = item.status || 'Unknown';

        if (status === 'cancelled') {
            statusColor = '#F44336'; // Red
            displayStatus = 'Cancelled';
        } else if (status === 'scheduled') {
            statusColor = '#FF9800'; // Orange/Yellow
            displayStatus = 'Scheduled';
        } else if (status === 'consulted') {
            statusColor = '#4CAF50'; // Green
            displayStatus = 'Consulted';
        }

        const showPrescriptionButton = status === 'consulted' && !!item.consultationPdfLink;

        return (
            <View style={styles.card}>
                <View style={styles.cardRow}>
                    <Text style={[styles.label, styles.nameLabel]}>Name: </Text>
                    <Text style={[styles.value, styles.nameValue]}>{item.patientName || 'N/A'}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Doctor: </Text>
                    <Text style={styles.value}>{item.doctorName || 'N/A'}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Clinic: </Text>
                    <Text style={styles.value}>{item.clinicName || 'N/A'}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Reason: </Text>
                    <Text style={styles.value}>{item.reasonToVisit || 'Consultation'}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Status: </Text>
                    <Text style={[styles.value, { color: statusColor }]}>{displayStatus}</Text>
                </View>

                <View style={[styles.cardRow, showPrescriptionButton ? styles.appointmentRowWithButton : { marginBottom: 0 }]}>
                    <Text style={styles.label}>Appointment: </Text>
                    <Text style={styles.value}>
                        {item.date ? item.date : ''}
                        {item.date && item.time ? ', ' : ''}
                        {item.time ? item.time : ''}
                    </Text>
                </View>

                {showPrescriptionButton && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.prescriptionButton}
                            onPress={() => handleViewPrescription(item)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.prescriptionButtonText}>View Prescription</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header matches screenshot: solid blue with white back arrow and white text */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointment History</Text>
            </View>

            {loading && history.length === 0 ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.primaryBlue} />
                </View>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item, index) => `${item?.id ?? 'history'}-${index}`}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.primaryBlue]}
                            tintColor={Colors.primaryBlue}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconCircle}>
                                <FlutterSvgIcon name="calendar" size={40} color={Colors.muted} />
                            </View>
                            <Text style={styles.emptyTitle}>No appointment history</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Light gray background like screenshot
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 50 : 36,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#3B82F6', // Primary Blue
    },
    backButton: {
        padding: 4,
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    list: {
        padding: 12,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 6,
        flexWrap: 'wrap',
    },
    appointmentRowWithButton: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '600',
    },
    nameLabel: {
        color: '#4B5563', // slightly darker
        fontWeight: '700',
    },
    value: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '400',
        flexShrink: 1,
    },
    nameValue: {
        color: '#4B5563', // slightly darker
        fontWeight: '700',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        marginTop: 4,
    },
    prescriptionButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    prescriptionButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
        paddingHorizontal: 40,
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        color: '#374151',
        fontWeight: '600',
    },
});
