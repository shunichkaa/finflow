import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Budget, CreateTransactionInput, CreateBudgetInput } from '../types';

// ============================================
// ИНТЕРФЕЙС STORE
// ============================================

interface FinanceStore {
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
                            id: crypto.randomUUID(),
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
                            id: crypto.randomUUID(),
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
        }),
        {
            name: 'finflow-storage',
        }
    )
);