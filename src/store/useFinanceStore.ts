import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {Budget, CreateBudgetInput, CreateTransactionInput, Transaction} from '../types';

interface FinanceStore {
    transactions: Transaction[];
    budgets: Budget[];
    addTransaction: (transaction: CreateTransactionInput) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (id: string, data: Partial<CreateTransactionInput>) => void;
    addBudget: (budget: CreateBudgetInput) => void;
    deleteBudget: (id: string) => void;
    updateBudget: (id: string, data: Partial<CreateBudgetInput>) => void;
    clearAllData: () => void;
}

export const useFinanceStore = create<FinanceStore>()(
    persist(
        (set) => ({
            transactions: [],
            budgets: [],
            addTransaction: (transaction: CreateTransactionInput) =>
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        {id: crypto.randomUUID(), date: new Date(), ...transaction},
                    ],
                })),
            deleteTransaction: (id: string) =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                })),
            updateTransaction: (id: string, data: Partial<CreateTransactionInput>) =>
                set((state) => ({
                    transactions: state.transactions.map((t) =>
                        t.id === id ? {...t, ...data, date: new Date(t.date)} : t
                    ),
                })),
            addBudget: (budget: CreateBudgetInput) =>
                set((state) => ({
                    budgets: [...state.budgets, {id: crypto.randomUUID(), ...budget}],
                })),
            deleteBudget: (id: string) =>
                set((state) => ({
                    budgets: state.budgets.filter((b) => b.id !== id),
                })),
            updateBudget: (id: string, data: Partial<CreateBudgetInput>) =>
                set((state) => ({
                    budgets: state.budgets.map((b) => (b.id === id ? {...b, ...data} : b)),
                })),
            clearAllData: () => set({transactions: [], budgets: []}),
        }),
        {
            name: 'finflow-storage'import {create} from 'zustand';
            import {persist} from 'zustand/middleware';
            import type {Budget, CreateBudgetInput, CreateTransactionInput, Transaction} from '../types';

            interface FinanceStore {
                transactions: Transaction[];
                budgets: Budget[];
                addTransaction: (transaction: CreateTransactionInput) => void;
                deleteTransaction: (id: string) => void;
                updateTransaction: (id: string, data: Partial<CreateTransactionInput>) => void;
                addBudget: (budget: CreateBudgetInput) => void;
                deleteBudget: (id: string) => void;
                updateBudget: (id: string, data: Partial<CreateBudgetInput>) => void;
                clearAllData: () => void;
            }

            type State = {
                transactions: Transaction[];
                budgets: Budget[];
            }

            type Actions = {
                addTransaction: (transaction: CreateTransactionInput) => void;
                deleteTransaction: (id: string) => void;
                updateTransaction: (id: string, data: Partial<CreateTransactionInput>) => void;
                addBudget: (budget: CreateBudgetInput) => void;
                deleteBudget: (id: string) => void;
                updateBudget: (id: string, data: Partial<CreateBudgetInput>) => void;
                clearAllData: () => void;
            }

            export const useFinanceStore = create<FinanceStore>()(
                persist(
                    (set: (fn: (state: State) => State) => void) => ({
                        transactions: [],
                        budgets: [],
                        addTransaction: (transaction: CreateTransactionInput) =>
                            set((state: State) => ({
                                ...state,
                                transactions: [
                                    ...state.transactions,
                                    {id: crypto.randomUUID(), ...transaction, date: new Date()},
                                ],
                            })),
                        deleteTransaction: (id: string) =>
                            set((state: State) => ({
                                ...state,
                                transactions: state.transactions.filter((t: Transaction) => t.id !== id),
                            })),
                        updateTransaction: (id: string, data: Partial<CreateTransactionInput>) =>
                            set((state: State) => ({
                                ...state,
                                transactions: state.transactions.map((t: Transaction) =>
                                    t.id === id ? {...t, ...data, date: new Date(t.date)} : t
                                ),
                            })),
                        addBudget: (budget: CreateBudgetInput) =>
                            set((state: State) => ({
                                ...state,
                                budgets: [...state.budgets, {id: crypto.randomUUID(), ...budget}],
                            })),
                        deleteBudget: (id: string) =>
                            set((state: State) => ({
                                ...state,
                                budgets: state.budgets.filter((b: Budget) => b.id !== id),
                            })),
                        updateBudget: (id: string, data: Partial<CreateBudgetInput>) =>
                            set((state: State) => ({
                                ...state,
                                budgets: state.budgets.map((b: Budget) => (b.id === id ? {...b, ...data} : b)),
                            })),
                        clearAllData: () => set(() => ({transactions: [], budgets: []})),
                    }),
                    {
                        name: 'finflow-storage',
                    }
                )
            );,
        }
    )
);