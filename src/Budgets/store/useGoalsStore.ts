import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, CreateGoalInput } from '../types';
import { triggerSync } from '../utils/cloudSyncTrigger';

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
                set(() => ({
                    goals,
                }));
            },
        }),
        {
            name: 'goals-storage',
        }
    )
);
