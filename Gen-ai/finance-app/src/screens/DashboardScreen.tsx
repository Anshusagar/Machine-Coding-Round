import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, useTheme, ProgressBar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { applyForLoan, payEMI } from '../store/slices/loanSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import dayjs from 'dayjs';

export default function DashboardScreen() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.kyc);
    const { activeLoan } = useSelector((state: RootState) => state.loans);

    const [loanAmount, setLoanAmount] = useState(10000);

    if (!user || user.status !== 'verified') {
        return (
            <View style={styles.container}>
                <Text variant="headlineMedium">Please Complete KYC</Text>
                <Text>Go to the Profile tab to verify your identity.</Text>
            </View>
        );
    }

    const handleApply = () => {
        Alert.alert(
            'Confirm Loan Application',
            `Apply for ₹${loanAmount} at 5% interest for 12 months?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Apply',
                    onPress: () => dispatch(applyForLoan({ amount: loanAmount }))
                },
            ]
        );
    };

    const handleRepay = (repaymentId: string, amount: number) => {
        Alert.alert(
            'Confirm Payment',
            `Pay EMI of ₹${amount}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Pay',
                    onPress: () => dispatch(payEMI({ repaymentId }))
                },
            ]
        );
    };

    const renderActiveLoan = () => {
        const nextEMI = activeLoan?.repayments.find(r => r.status === 'pending');
        const repaidPercent = activeLoan ? activeLoan.totalRepaid / (activeLoan.repayments[0].amount * 12) : 0;

        return (
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>Active Loan</Text>
                        <Text variant="displaySmall" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                            ₹{activeLoan?.amount.toLocaleString()}
                        </Text>
                        <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                            Repaid: {Math.round(repaidPercent * 100)}%
                        </Text>
                        <ProgressBar progress={repaidPercent} color={theme.colors.primary} style={{ height: 8, borderRadius: 4, marginTop: 4 }} />
                    </Card.Content>
                </Card>

                <Text variant="titleLarge" style={styles.sectionTitle}>Upcoming EMIs</Text>

                {activeLoan?.repayments.map((emi, index) => (
                    <Card key={emi.id} style={[styles.emiCard, emi.status === 'paid' && styles.paidCard]}>
                        <Card.Title
                            title={`EMI #${index + 1}`}
                            subtitle={`Due: ${dayjs(emi.dueDate).format('DD MMM YYYY')}`}
                            right={(props) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text variant="titleMedium" style={{ marginRight: 16, fontWeight: 'bold' }}>
                                        ₹{emi.amount}
                                    </Text>
                                    {emi.status === 'pending' && nextEMI?.id === emi.id && (
                                        <Button mode="contained-tonal" compact onPress={() => handleRepay(emi.id, emi.amount)}>
                                            Pay
                                        </Button>
                                    )}
                                    {emi.status === 'paid' && (
                                        <Text style={{ color: 'green', marginRight: 16 }}>Paid</Text>
                                    )}
                                </View>
                            )}
                        />
                    </Card>
                ))}
            </ScrollView>
        );
    };

    const renderApplication = () => {
        const interest = loanAmount * 0.05;
        const totalPayable = loanAmount + interest;
        const emi = Math.round(totalPayable / 12);

        return (
            <View style={styles.applyContainer}>
                <Text variant="headlineMedium" style={styles.title}>New Loan Application</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium">Select Amount</Text>
                        <Text variant="displayMedium" style={{ color: theme.colors.primary, marginVertical: 16 }}>
                            ₹{loanAmount.toLocaleString()}
                        </Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={5000}
                            maximumValue={50000}
                            step={1000}
                            value={loanAmount}
                            onValueChange={setLoanAmount}
                            minimumTrackTintColor={theme.colors.primary}
                            maximumTrackTintColor="#000000"
                        />
                        <View style={styles.row}>
                            <Text>Min: ₹5k</Text>
                            <Text>Max: ₹50k</Text>
                        </View>
                    </Card.Content>
                </Card>

                <View style={styles.breakdown}>
                    <View style={styles.row}>
                        <Text variant="bodyLarge">Interest Rate</Text>
                        <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>5% Flat</Text>
                    </View>
                    <View style={styles.row}>
                        <Text variant="bodyLarge">Tenure</Text>
                        <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>12 Months</Text>
                    </View>
                    <View style={styles.row}>
                        <Text variant="bodyLarge">Total Interest</Text>
                        <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>₹{interest}</Text>
                    </View>
                    <View style={[styles.row, { marginTop: 16 }]}>
                        <Text variant="titleMedium">Monthly EMI</Text>
                        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>₹{emi}</Text>
                    </View>
                </View>

                <Button
                    mode="contained"
                    onPress={handleApply}
                    style={styles.applyButton}
                    contentStyle={{ paddingVertical: 8 }}
                >
                    Apply Now
                </Button>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {activeLoan ? renderActiveLoan() : renderApplication()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 20,
    },
    applyContainer: {
        padding: 20,
        flex: 1,
    },
    card: {
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
    },
    emiCard: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
    },
    paidCard: {
        opacity: 0.6,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    breakdown: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    applyButton: {
        marginTop: 'auto',
    },
});
