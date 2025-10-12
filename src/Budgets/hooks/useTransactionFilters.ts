import { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';

export const useTransactionFilters = (transactions: Transaction[]) => {
    const [type, setType] = useState<TransactionType | 'all'>('all');
    const [category, setCategory] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filteredTransactions = useMemo(() => {
        return transactions.filter((t) => {
            // Фильтр по типу
            if (type !== 'all' && t.type !== type) return false;

            // Фильтр по категории
            if (category && t.category !== category) return false;

            // Фильтр по дате от
            if (dateFrom) {
                const tDate = new Date(t.date).setHours(0, 0, 0, 0);
                const fromDate = new Date(dateFrom).setHours(0, 0, 0, 0);
                if (tDate < fromDate) return false;
            }

            // Фильтр по дате до
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