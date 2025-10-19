import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, CreateGoalInput } from '../types';

interface GoalsState {
    goals: Goal[];
    addGoal: (goal: CreateGoalInput) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;
    addToGoal: (id: string, amount: number) => void;
    completeGoal: (id: string) => void;
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
            },
            
            updateGoal: (id: string, updates: Partial<Goal>) => {
                set((state) => ({
                    goals: state.goals.map((goal) =>
                        goal.id === id ? { ...goal, ...updates } : goal
                    ),
                }));
            },
            
            deleteGoal: (id: string) => {
                set((state) => ({
                    goals: state.goals.filter((goal) => goal.id !== id),
                }));
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
            },
            
            completeGoal: (id: string) => {
                set((state) => ({
                    goals: state.goals.map((goal) =>
                        goal.id === id ? { ...goal, isCompleted: true } : goal
                    ),
                }));
            },
        }),
        {
            name: 'goals-storage',
        }
    )
);
