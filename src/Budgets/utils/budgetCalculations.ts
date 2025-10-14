import { Transaction, Budget } from '../types';
import { startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns';

export const calculateBudgetSpent = (
    budget: Budget,
    transactions: Transaction[]
): number => {
    const now = new Date();
    let periodStart: Date;
    let periodEnd: Date;

    if (budget.period === 'weekly') {
        periodStart = startOfWeek(now, { weekStartsOn: 1 }); // Понедельник
        periodEnd = endOfWeek(now, { weekStartsOn: 1 });
    } else {
        periodStart = startOfMonth(now);
        periodEnd = endOfMonth(now);
    }

    return transactions
        .filter((t) => {
            const tDate = new Date(t.date);
            return (
                t.type === 'expense' &&
                t.category === budget.category &&
                tDate >= periodStart &&
                tDate <= periodEnd
            );
        })
        .reduce((sum, t) => sum + t.amount, 0);
};

export const getBudgetPercentage = (spent: number, limit: number): number => {
    return Math.min((spent / limit) * 100, 100);
};

export const getBudgetStatus = (
    percentage: number
): 'safe' | 'warning' | 'danger' | 'exceeded' => {
    if (percentage < 70) return 'safe';
    if (percentage < 90) return 'warning';
    if (percentage < 100) return 'danger';
    return 'exceeded';
};

export const getBudgetStatusColor = (status: string) => {
    const colors = {
        safe: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        exceeded: '#dc2626',
    };
    return colors[status as keyof typeof colors] || colors.safe;
};

export const getDaysLeftInPeriod = (period: 'monthly' | 'weekly'): number => {
    const now = new Date();
    const periodEnd = period === 'weekly'
        ? endOfWeek(now, { weekStartsOn: 1 })
        : endOfMonth(now);

    const diff = periodEnd.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};