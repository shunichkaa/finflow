import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, CreateGoalInput } from '../types';
import { triggerSync } from '../utils/cloudSyncTrigger';
import { useNotificationStore } from './useNotificationStore';
import { migrateGoalIcon } from '../utils/migrationHelpers';

interface GoalsState {
    goals: Goal[];
    addGoal: (goal: CreateGoalInput) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;
    addToGoal: (id: string, amount: number) => void;
    completeGoal: (id: string) => void;
    setGoals: (goals: Goal[]) => void;
}

export const useGoalsStore = create<GoalsState>()(
    persist(
        (set) => ({
            goals: [],

                        addGoal: (goalData: CreateGoalInput) => {
                const newGoal: Goal = {
                    ...goalData,
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                    isCompleted: false,
                };

                                set((state) => ({
                    goals: [...state.goals, newGoal],
                }));

                                useNotificationStore.getState().addNotification({
                    type: 'goal',
                    severity: 'success',
                    title: 'Копилка создана',
                    message: `Копилка "${goalData.name}" успешно создана`,
                });

                                triggerSync();
            },

                        updateGoal: (id: string, updates: Partial<Goal>) => {
                set((state) => ({
                    goals: state.goals.map((goal) =>
                        goal.id === id ? { ...goal, ...updates } : goal
                    ),
                }));
                triggerSync();
            },

                        deleteGoal: (id: string) => {
                set((state) => ({
                    goals: state.goals.filter((goal) => goal.id !== id),
                }));
                triggerSync();
            },

                        addToGoal: (id: string, amount: number) => {
                set((state) => ({
                    goals: state.goals.map((goal) => {
                        if (goal.id === id) {
                            const newAmount = goal.currentAmount + amount;
                            return {
                                ...goal,
                                currentAmount: newAmount,
                                isCompleted: newAmount >= goal.targetAmount,
                            };
                        }
                        return goal;
                    }),
                }));
                triggerSync();
            },

                        completeGoal: (id: string) => {
                set((state) => ({
                    goals: state.goals.map((goal) =>
                        goal.id === id ? { ...goal, isCompleted: true } : goal
                    ),
                }));
                triggerSync();
            },

                        setGoals: (goals: Goal[]) => {
                const migratedGoals = goals.map(goal => ({
                    ...goal,
                    icon: migrateGoalIcon(goal.icon)
                }));
                set(() => ({
                    goals: migratedGoals,
                }));
            },
        }),
        {
            name: 'goals-storage',
            version: 2,
            migrate: (persistedState: unknown) => {
                const state = persistedState as Partial<GoalsState> & { goals?: Goal[] };
                if (state?.goals) {
                    state.goals = state.goals.map((goal: Goal) => ({
                        ...goal,
                        icon: migrateGoalIcon(goal.icon)
                    }));
                }
                return state as GoalsState;
            },
        }
    )
);