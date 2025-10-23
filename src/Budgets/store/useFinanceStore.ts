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
    setTransactions: (transactions: Transaction[]) => void;

    // ===== ACTIONS - BUDGETS =====
    addBudget: (budget: CreateBudgetInput) => void;
    updateBudget: (id: string, data: Partial<Budget>) => void;
    deleteBudget: (id: string) => void;
    setBudgets: (budgets: Budget[]) => void;

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

            setTransactions: (transactions) =>
                set(() => ({
                    transactions,
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

            setBudgets: (budgets) =>
                set(() => ({
                    budgets,
                })),

            // ===== UTILITY =====

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
                            category: '10', // Зарплата
                            description: 'Зарплата',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5), // 5 дней назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 15000,
                            category: '11', // Фриланс
                            description: 'Фриланс проект',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3), // 3 дня назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 25000,
                            category: '1', // Еда и продукты
                            description: 'Продукты',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4), // 4 дня назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 8000,
                            category: '2', // Транспорт
                            description: 'Транспорт',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), // 2 дня назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 12000,
                            category: '4', // Развлечения
                            description: 'Развлечения',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), // 1 день назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 5000,
                            category: '5', // Здоровье
                            description: 'Медицина',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), // сегодня
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'income',
                            amount: 20000,
                            category: '12', // Инвестиции
                            description: 'Дивиденды',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), // 7 дней назад
                            createdAt: new Date(),
                        },
                        {
                            id: uuid(),
                            type: 'expense',
                            amount: 15000,
                            category: '3', // Жильё
                            description: 'Коммунальные услуги',
                            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6), // 6 дней назад
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