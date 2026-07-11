import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export interface Repayment {
    id: string;
    dueDate: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue';
    paidDate?: string;
}

export interface Loan {
    id: string;
    amount: number;
    rate: number; // 5% flat
    tenure: number; // 12 months
    startDate: string;
    status: 'active' | 'closed';
    repayments: Repayment[];
    totalRepaid: number;
}

interface LoanState {
    activeLoan: Loan | null;
    history: Loan[];
}

const initialState: LoanState = {
    activeLoan: null,
    history: [],
};

const calculateEMIs = (amount: number, startDate: string): Repayment[] => {
    const rate = 0.05;
    const tenure = 12;
    const totalInterest = amount * rate; // Flat 5% for 12 months
    const totalAmount = amount + totalInterest;
    const emiAmount = Math.round(totalAmount / tenure);

    const repayments: Repayment[] = [];
    for (let i = 1; i <= tenure; i++) {
        repayments.push({
            id: uuidv4(),
            dueDate: dayjs(startDate).add(i, 'month').toISOString(),
            amount: emiAmount,
            status: 'pending',
        });
    }
    return repayments;
};

const loanSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
        applyForLoan: (state, action: PayloadAction<{ amount: number }>) => {
            if (state.activeLoan) return; // Only one active loan allowed

            const { amount } = action.payload;
            const startDate = dayjs().toISOString();

            const newLoan: Loan = {
                id: uuidv4(),
                amount,
                rate: 0.05,
                tenure: 12,
                startDate,
                status: 'active',
                repayments: calculateEMIs(amount, startDate),
                totalRepaid: 0,
            };

            state.activeLoan = newLoan;
        },
        payEMI: (state, action: PayloadAction<{ repaymentId: string }>) => {
            if (!state.activeLoan) return;

            const repaymentIndex = state.activeLoan.repayments.findIndex(r => r.id === action.payload.repaymentId);
            if (repaymentIndex !== -1 && state.activeLoan.repayments[repaymentIndex].status === 'pending') {
                const repayment = state.activeLoan.repayments[repaymentIndex];
                repayment.status = 'paid';
                repayment.paidDate = dayjs().toISOString();
                state.activeLoan.totalRepaid += repayment.amount;

                // Check if loan is closed
                if (state.activeLoan.repayments.every(r => r.status === 'paid')) {
                    state.activeLoan.status = 'closed';
                    state.history.push(state.activeLoan);
                    state.activeLoan = null;
                }
            }
        },
    },
});

export const { applyForLoan, payEMI } = loanSlice.actions;
export default loanSlice.reducer;
