// Medications Slice — equivalent to Flutter's active_medication_bloc.dart
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { networkClient } from '../../services/networkClient';
import { API_URLS } from '../../config/constants';

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    startDate: string;
    endDate: string;
    status: string;
    timeOfDay?: string;
    [key: string]: any;
}

interface MedicationsState {
    activeMedications: Medication[];
    loading: boolean;
    error: string | null;
}

const initialState: MedicationsState = {
    activeMedications: [],
    loading: false,
    error: null,
};

export const fetchActiveMedications = createAsyncThunk(
    'medications/fetchActive',
    async (_, { rejectWithValue }) => {
        const response = await networkClient.get(
            API_URLS.GET_ACTIVE_MEDICATIONS,
            (json: any) => {
                const flattened: Medication[] = [];
                // backend returns { "Breakfast": { "PatientName": [Prescriptions] } }
                if (json && typeof json === 'object') {
                    Object.entries(json).forEach(([timeKey, patientMap]: [string, any]) => {
                        if (patientMap && typeof patientMap === 'object') {
                            Object.values(patientMap).forEach((prescriptions: any) => {
                                if (Array.isArray(prescriptions)) {
                                    prescriptions.forEach((item: any) => {
                                        flattened.push({
                                            id: item.prescription_id || Math.random().toString(),
                                            name: item.brand_name || 'Medicine',
                                            dosage: item.variant_id || '',
                                            frequency: timeKey, // Using the timeKey as frequency
                                            duration: item.duration?.toString() || '',
                                            instructions: '',
                                            startDate: item.created_at ? new Date(item.created_at).toLocaleDateString() : '',
                                            endDate: item.expiry_at ? new Date(item.expiry_at).toLocaleDateString() : '',
                                            status: 'active',
                                            timeOfDay: timeKey,
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
                return flattened;
            },
        );
        if (!response.isSuccess) return rejectWithValue(response.statusMessage);
        return response.data || [];
    },
);

const medicationsSlice = createSlice({
    name: 'medications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveMedications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveMedications.fulfilled, (state, action) => {
                state.loading = false;
                state.activeMedications = action.payload as Medication[];
            })
            .addCase(fetchActiveMedications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default medicationsSlice.reducer;
