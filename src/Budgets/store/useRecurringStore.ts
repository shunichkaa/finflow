import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {RecurringTransaction} from '../types/recurring';

interface RecurringStore {
    recurring: RecurringTransaction[];
    addRecurring: (recurring: Omit<RecurringTransaction, 'id'>) => void;
    updateRecurring: (id: string, recurring: Partial<RecurringTransaction>) => void;
    deleteRecurring: (id: string) => void;
    toggleRecurring: (id: string) => void;
    getNextDueDate: (recurring: RecurringTransaction) => string;
    getDueRecurring: () => RecurringTransaction[];
}

const calculateNextDue = (recurring: RecurringTransaction): string => {
    const lastDate = recurring.lastCreated
        ? new Date(recurring.lastCreated)
        : new Date(recurring.startDate);
    const nextDate = new Date(lastDate);

    switch (recurring.frequency) {
        case 'daily':
            nextDate.setDate(nextDate.getDate() + 1);
            break;
        case 'weekly':
            nextDate.setDate(nextDate.getDate() + 7);
            break;
        case 'monthly':
            nextDate.setMonth(nextDate.getMonth() + 1);
            if (recurring.dayOfMonth) {
                nextDate.setDate(recurring.dayOfMonth);
            }
            break;
        case 'yearly':
            nextDate.setFullYear(nextDate.getFullYear() + 1);
            if (recurring.monthOfYear) {
                nextDate.setMonth(recurring.monthOfYear - 1);
            }
            if (recurring.dayOfMonth) {
                nextDate.setDate(recurring.dayOfMonth);
            }
            break;
    }

    return nextDate.toISOString();
};

export const useRecurringStore = create<RecurringStore>()(
    persist(
        (set, get) => ({
            recurring: [],

            addRecurring: (recurringData) => {
                const id = `recurring_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
                const nextDue = calculateNextDue({
                    ...recurringData,
                    id,
                    isActive: true,
                });

                const newRecurring: RecurringTransaction = {
                    ...recurringData,
                    id,
                    isActive: true,
                    nextDue,
                };

                set((state) => ({
                    recurring: [...state.recurring, newRecurring],
                }));
            },

            updateRecurring: (id, updates) => {
                set((state) => ({
                    recurring: state.recurring.map((r) =>
                        r.id === id ? {...r, ...updates} : r
                    ),
                }));
            },

            deleteRecurring: (id) => {
                set((state) => ({
                    recurring: state.recurring.filter((r) => r.id !== id),
                }));
            },

            toggleRecurring: (id) => {
                set((state) => ({
                    recurring: state.recurring.map((r) =>
                        r.id === id ? {...r, isActive: !r.isActive} : r
                    ),
                }));
            },

            getNextDueDate: (recurring) => {
                return calculateNextDue(recurring);
            },

            getDueRecurring: () => {
                const now = new Date();
                return get().recurring.filter((r) => {
                    if (!r.isActive) return false;
                    if (r.endDate && new Date(r.endDate) < now) return false;

                    const nextDue = r.nextDue
                        ? new Date(r.nextDue)
                        : new Date(calculateNextDue(r));
                    return nextDue <= now;
                });
            },
        }),
        {
            name: 'recurring-storage',
        }
    )
);