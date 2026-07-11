import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { submitKYC } from '../store/slices/kycSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KYCScreen() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const kycStatus = useSelector((state: RootState) => state.kyc.user?.status);

    const [name, setName] = useState('');
    const [pan, setPan] = useState('');
    const [dob, setDob] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');

    const handleSubmit = () => {
        if (!name || !pan || !dob || !monthlyIncome) return;

        dispatch(submitKYC({
            name,
            pan,
            dob,
            monthlyIncome: parseInt(monthlyIncome, 10),
        }));
    };

    if (kycStatus === 'verified') {
        return (
            <View style={styles.verifiedContainer}>
                <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>Verified</Text>
                <Text>Your KYC is complete. You can now apply for loans.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text variant="headlineMedium" style={styles.title}>Identity Verification</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>
                    Complete your KYC to unlock instant loans at 5% interest.
                </Text>

                <TextInput
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="PAN Number"
                    value={pan}
                    onChangeText={setPan}
                    mode="outlined"
                    style={styles.input}
                    autoCapitalize="characters"
                />

                <TextInput
                    label="Date of Birth (DD/MM/YYYY)"
                    value={dob}
                    onChangeText={setDob}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Monthly Income (₹)"
                    value={monthlyIncome}
                    onChangeText={setMonthlyIncome}
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.input}
                />

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    contentStyle={{ paddingVertical: 8 }}
                >
                    Verify Identity
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    verifiedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: '#666',
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});
