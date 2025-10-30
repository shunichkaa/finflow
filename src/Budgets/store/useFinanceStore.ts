import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Transaction, Budget, CreateTransactionInput, CreateBudgetInput } from '../types';
import { triggerSync } from '../utils/cloudSyncTrigger';
import { useNotificationStore } from './useNotificationStore';


export interface FinanceStore {
    transactions: Transaction[];
    budgets: Budget[];

    addTransaction: (transaction: CreateTransactionInput) => void;
    updateTransaction: (id: string, data: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    setTransactions: (transactions: Transaction[]) => void;

    addBudget: (budget: CreateBudgetInput) => void;
    updateBudget: (id: string, data: Partial<Budget>) => void;
    deleteBudget: (id: string) => void;
    setBudgets: (budgets: Budget[]) => void;

    clearAllData: () => void;
    addTestData: () => void;
}


export const useFinanceStore = create<FinanceStore>()(
    persist(
        (set) => ({
            transactions: [],
            budgets: [],


            addTransaction: (transaction) => {
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        {
                            ...transaction,
                            id: uuid(),
                            createdAt: new Date(),
                        },
                    ],
                }));

                                useNotificationStore.getState().addNotification({
                    type: 'reminder',
                    severity: 'success',
                    title: 'Транзакция добавлена',
                    message: `${transaction.type === 'income' ? 'Доход' : 'Расход'} на сумму ${transaction.amount} успешно добавлен`,
                });

                                triggerSync();
            },

            updateTransaction: (id, data) => {
                set((state) => ({
                    transactions: state.transactions.map((t) =>
                        t.id === id ? { ...t, ...data } : t
                    ),
                }));
                triggerSync();
            },

            deleteTransaction: (id) => {
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                }));
                triggerSync();
            },

            setTransactions: (transactions) =>
                set(() => ({
                    transactions,
                })),


            addBudget: (budget) => {
                set((state) => ({
                    budgets: [
                        ...state.budgets,
                        {
                            ...budget,
                            id: uuid(),
                        },
                    ],
                }));

                                useNotificationStore.getState().addNotification({
                    type: 'budget',
                    severity: 'success',
                    title: 'Бюджет создан',
                    message: `Бюджет для категории "${budget.category}" успешно создан`,
                });

                                triggerSync();
            },

            updateBudget: (id, data) => {
                set((state) => ({
                    budgets: state.budgets.map((b) =>
                        b.id === id ? { ...b, ...data } : b
                    ),
                }));
                triggerSync();
            },

            deleteBudget: (id) => {
                set((state) => ({
                    budgets: state.budgets.filter((b) => b.id !== id),
                }));
                triggerSync();
            },

            setBudgets: (budgets) =>
                set(() => ({
                    budgets,
                })),


            clearAllData: () =>
                set(() => ({
                    transactions: [],
                    budgets: [],
                })),

            addTestData: () =>
                set((state) => {
                    const now = new Date();
                    const testTransactions: Transaction[] = [
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 50000,
                            category: '10', 
                            description: 'Зарплата',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 15000,
                            category: '11', 
                            description: 'Фриланс проект',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 25000,
                            category: '1', 
                            description: 'Продукты',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 8000,
                            category: '2', 
                            description: 'Транспорт',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 12000,
                            category: '4', 
                            description: 'Развлечения',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 5000,
                            category: '5', 
                            description: 'Медицина',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 20000,
                            category: '12', 
                            description: 'Дивиденды',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), 
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 15000,
                            category: '3', 
                            description: 'Коммунальные услуги',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6), 
                            createdAt: new Date(),
                        },
                    ];

                    return {
                        transactions: [...state.transactions, ...testTransactions],
                    };
                }),
        }),
        {
            name: 'finflow-storage',
        }
    )
);