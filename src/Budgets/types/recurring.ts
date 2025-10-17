export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurringTransaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    type: 'income' | 'expense';
    frequency: RecurringFrequency;
    startDate: string;
    endDate?: string;
    lastCreated?: string;
    nextDue?: string;
    isActive: boolean;
    dayOfWeek?: number;
    dayOfMonth?: number;
    monthOfYear?: number;
}

export interface Transaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'income' | 'expense';
    tags?: string[];
    notes?: string;
    receiptUrl?: string;
    recurringId?: string;
}