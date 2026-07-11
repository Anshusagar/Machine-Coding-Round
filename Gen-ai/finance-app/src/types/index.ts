export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string; // ISO 8601
    note?: string;
}

export interface Budget {
    id: string; // usually category name or 'global'
    categoryId: string; // 'global' or specific category
    limit: number;
    period: string; // 'YYYY-MM'
}
