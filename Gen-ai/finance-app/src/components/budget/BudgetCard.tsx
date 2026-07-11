import React from 'react';
import { Card, ProgressBar, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface Props {
    spent: number;
    limit: number;
    period: string; // e.g. "January 2026"
}

export const BudgetCard = ({ spent, limit, period }: Props) => {
    const theme = useTheme();
    // Avoid division by zero
    const progress = limit > 0 ? Math.min(spent / limit, 1) : 0;
    const color = progress > 0.9 ? theme.colors.error : theme.colors.primary;

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleMedium">Monthly Budget: {period}</Text>
                <View style={styles.row}>
                    <Text variant="headlineMedium">${spent.toFixed(2)}</Text>
                    <Text variant="bodyMedium" style={{ alignSelf: 'flex-end', marginBottom: 4 }}>
                        / ${limit.toFixed(2)}
                    </Text>
                </View>
                <ProgressBar progress={progress} color={color} style={styles.bar} />
                <Text variant="bodySmall" style={{ color: color }}>
                    {progress >= 1 ? 'Over Budget!' : `${((1 - progress) * 100).toFixed(0)}% remaining`}
                </Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: { margin: 16 },
    row: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
    bar: { height: 8, borderRadius: 4, marginBottom: 8 },
});
