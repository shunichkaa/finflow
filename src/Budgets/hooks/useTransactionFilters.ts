import { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';

export const useTransactionFilters = (transactions: Transaction[]) => {
    const [type, setType] = useState<TransactionType | 'all'>('all');
    const [category, setCategory] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filteredTransactions = useMemo(() => {
        return transactions.filter((t) => {
            if (type !== 'all' && t.type !== type) return false;

            if (category && t.category !== category) return false;

            if (dateFrom) {
                const tDate = new Date(t.date).setHours(0, 0, 0, 0);
                const fromDate = new Date(dateFrom).setHours(0, 0, 0, 0);
                if (tDate < fromDate) return false;
            }

            if (dateTo) {
                const tDate = new Date(t.date).setHours(0, 0, 0, 0);
                const toDate = new Date(dateTo).setHours(0, 0, 0, 0);
                if (tDate > toDate) return false;
            }

            return true;
        });
    }, [transactions, type, category, dateFrom, dateTo]);

    const reset = () => {
        setType('all');
        setCategory('');
        setDateFrom('');
        setDateTo('');
    };

    return {
        filters: { type, category, dateFrom, dateTo },
        setType,
        setCategory,
        setDateFrom,
        setDateTo,
        reset,
        filteredTransactions,
    };
};