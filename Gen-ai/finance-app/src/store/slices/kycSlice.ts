import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KYCType {
    id: string;
    name: string;
    pan: string;
    dob: string;
    monthlyIncome: number;
    status: 'pending' | 'verified' | 'rejected';
}

interface KYCState {
    user: KYCType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: KYCState = {
    user: null,
    status: 'idle',
    error: null,
};

const kycSlice = createSlice({
    name: 'kyc',
    initialState,
    reducers: {
        submitKYC: (state, action: PayloadAction<Omit<KYCType, 'status' | 'id'>>) => {
            // Simulation of instant verification
            state.status = 'succeeded';
            state.user = {
                id: 'user-1',
                ...action.payload,
                status: 'verified', // Auto-verify for MVP
            };
        },
        resetKYC: (state) => {
            state.user = null;
            state.status = 'idle';
        },
    },
});

export const { submitKYC, resetKYC } = kycSlice.actions;
export default kycSlice.reducer;
