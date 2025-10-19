import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Transaction, Budget, CreateTransactionInput, CreateBudgetInput } from '../types';

// ============================================
// ИНТЕРФЕЙС STORE
// ============================================

export interface FinanceStore {
    // ===== STATE =====
    transactions: Transaction[];
    budgets: Budget[];

    // ===== ACTIONS - TRANSACTIONS =====
    addTransaction: (transaction: CreateTransactionInput) => void;
    updateTransaction: (id: string, data: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;

    // ===== ACTIONS - BUDGETS =====
    addBudget: (budget: CreateBudgetInput) => void;
    updateBudget: (id: string, data: Partial<Budget>) => void;
    deleteBudget: (id: string) => void;

    // ===== UTILITY =====
    clearAllData: () => void;
    addTestData: () => void;
}

// ============================================
// СОЗДАНИЕ STORE
// ============================================

export const useFinanceStore = create<FinanceStore>()(
    persist(
        (set) => ({
            // ===== НАЧАЛЬНОЕ СОСТОЯНИЕ =====
            transactions: [],
            budgets: [],

            // ===== МЕТОДЫ ДЛЯ ТРАНЗАКЦИЙ =====

            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        {
                            ...transaction,
                            id: uuid(),
                            createdAt: new Date(),
                        },
                    ],
                })),

            updateTransaction: (id, data) =>
                set((state) => ({
                    transactions: state.transactions.map((t) =>
                        t.id === id ? { ...t, ...data } : t
                    ),
                })),

            deleteTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                })),

            // ===== МЕТОДЫ ДЛЯ БЮДЖЕТОВ =====

            addBudget: (budget) =>
                set((state) => ({
                    budgets: [
                        ...state.budgets,
                        {
                            ...budget,
                            id: uuid(),
                        },
                    ],
                })),

            updateBudget: (id, data) =>
                set((state) => ({
                    budgets: state.budgets.map((b) =>
                        b.id === id ? { ...b, ...data } : b
                    ),
                })),

            deleteBudget: (id) =>
                set((state) => ({
                    budgets: state.budgets.filter((b) => b.id !== id),
                })),

            // ===== UTILITY =====

            clearAllData: () =>
                set(() => ({
                    transactions: [],
                    budgets: [],
                })),

            addTestData: () =>
                set((state) => {
                    const testTransactions: Transaction[] = [
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 50000,
                            category: 'salary',
                            description: 'Зарплата',
                            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 дней назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 15000,
                            category: 'freelance',
                            description: 'Фриланс проект',
                            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 дня назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 25000,
                            category: 'food',
                            description: 'Продукты',
                            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 дня назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 8000,
                            category: 'transport',
                            description: 'Транспорт',
                            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 12000,
                            category: 'entertainment',
                            description: 'Развлечения',
                            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 день назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 5000,
                            category: 'health',
                            description: 'Медицина',
                            date: new Date(), // сегодня
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