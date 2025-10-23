import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useFinanceStore } from '../store/useFinanceStore';
import { useGoalsStore } from '../store/useGoalsStore';
import { useAuth } from './useAuth';
import type { Transaction, Budget } from '../types';
import type { Goal } from '../types';
import { setGlobalSyncTrigger } from '../utils/cloudSyncTrigger';

interface SyncStatus {
    isSyncing: boolean;
    lastSync: Date | null;
    error: string | null;
}

export const useCloudSync = (enabled: boolean) => {
    const [status, setStatus] = useState<SyncStatus>({
        isSyncing: false,
        lastSync: null,
        error: null
    });
    
    // Используем localStorage для надёжного отслеживания первой загрузки
    const getInitialLoadKey = (userId: string) => `cloud-sync-initial-load-${userId}`;
    const hasInitialLoaded = (userId: string) => {
        return localStorage.getItem(getInitialLoadKey(userId)) === 'true';
    };
    const markInitialLoaded = (userId: string) => {
        localStorage.setItem(getInitialLoadKey(userId), 'true');
    };

    const { session } = useAuth();
    const transactions = useFinanceStore(state => state.transactions);
    const budgets = useFinanceStore(state => state.budgets);
    const goals = useGoalsStore(state => state.goals);
    const setTransactions = useFinanceStore(state => state.setTransactions);
    const setBudgets = useFinanceStore(state => state.setBudgets);
    const setGoals = useGoalsStore(state => state.setGoals);

    // Загрузка данных из облака
    const syncFromCloud = async () => {
        if (!session?.user?.id || !enabled) return;

        setStatus(prev => ({ ...prev, isSyncing: true, error: null }));

        try {
            // Загрузка транзакций
            const { data: transactionsData, error: txError } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', session.user.id);

            if (txError) throw txError;

            // Загрузка бюджетов
            const { data: budgetsData, error: budgetError } = await supabase
                .from('budgets')
                .select('*')
                .eq('user_id', session.user.id);

            if (budgetError) throw budgetError;

            // Загрузка целей
            const { data: goalsData, error: goalsError } = await supabase
                .from('goals')
                .select('*')
                .eq('user_id', session.user.id);

            if (goalsError) throw goalsError;

            // Преобразуем данные (строки дат → Date objects)
            if (transactionsData) {
                const parsedTransactions: Transaction[] = transactionsData.map((tx: any) => ({
                    ...tx,
                    date: new Date(tx.date),
                    createdAt: new Date(tx.created_at),
                }));
                setTransactions(parsedTransactions);
            }

            if (budgetsData) {
                const parsedBudgets: Budget[] = budgetsData.map((b: any) => ({
                    ...b,
                    limit: b.limit_amount, // Map DB column to app field
                    limitAmount: b.limit_amount,
                }));
                setBudgets(parsedBudgets);
            }

            if (goalsData) {
                const parsedGoals: Goal[] = goalsData.map((g: any) => ({
                    ...g,
                    targetAmount: g.target_amount,
                    currentAmount: g.current_amount,
                    isCompleted: g.is_completed,
                    deadline: g.deadline ? new Date(g.deadline) : undefined,
                    createdAt: new Date(g.created_at),
                }));
                setGoals(parsedGoals);
            }

            setStatus({
                isSyncing: false,
                lastSync: new Date(),
                error: null
            });
        } catch (error) {
            console.error('Sync error:', error);
            setStatus({
                isSyncing: false,
                lastSync: null,
                error: error instanceof Error ? error.message : 'Sync failed'
            });
        }
    };

    // Сохранение данных в облако
    const syncToCloud = async () => {
        if (!session?.user?.id || !enabled) return;

        setStatus(prev => ({ ...prev, isSyncing: true, error: null }));

        try {
            // Сохранение транзакций (map app fields → DB columns)
            const transactionsForDB = transactions.map(tx => ({
                id: tx.id,
                user_id: session.user.id,
                type: tx.type,
                amount: tx.amount,
                category: tx.category,
                description: tx.description || null,
                date: tx.date.toISOString(),
                tags: tx.tags || [],
                created_at: tx.createdAt.toISOString(),
            }));

            const { error: txError } = await supabase
                .from('transactions')
                .upsert(transactionsForDB, { onConflict: 'id' });

            if (txError) throw txError;

            // Сохранение бюджетов (map app fields → DB columns)
            const budgetsForDB = budgets.map(budget => ({
                id: budget.id,
                user_id: session.user.id,
                category: budget.category,
                limit_amount: budget.limit || budget.limitAmount,
                period: budget.period,
            }));

            const { error: budgetError } = await supabase
                .from('budgets')
                .upsert(budgetsForDB, { onConflict: 'id' });

            if (budgetError) throw budgetError;

            // Сохранение целей (map app fields → DB columns)
            const goalsForDB = goals.map(goal => ({
                id: goal.id,
                user_id: session.user.id,
                name: goal.name,
                target_amount: goal.targetAmount,
                current_amount: goal.currentAmount,
                deadline: goal.deadline ? goal.deadline.toISOString() : null,
                icon: goal.icon || null,
                is_completed: goal.isCompleted,
                created_at: goal.createdAt.toISOString(),
            }));

            const { error: goalsError } = await supabase
                .from('goals')
                .upsert(goalsForDB, { onConflict: 'id' });

            if (goalsError) throw goalsError;

            setStatus({
                isSyncing: false,
                lastSync: new Date(),
                error: null
            });
        } catch (error) {
            console.error('Sync error:', error);
            setStatus({
                isSyncing: false,
                lastSync: null,
                error: error instanceof Error ? error.message : 'Sync failed'
            });
        }
    };

    // Начальная загрузка данных при включении синхронизации (только один раз для каждого пользователя)
    useEffect(() => {
        if (enabled && session?.user?.id && !hasInitialLoaded(session.user.id)) {
            syncFromCloud().then(() => {
                markInitialLoaded(session.user.id);
            });
        }
    }, [enabled, session?.user?.id]);

    // Автосохранение каждые 30 секунд
    useEffect(() => {
        if (enabled && session?.user?.id && hasInitialLoaded(session.user.id)) {
            const interval = setInterval(() => {
                syncToCloud();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [enabled, session?.user?.id]);

    // Синхронизация при изменении данных (debounced)
    useEffect(() => {
        if (enabled && session?.user?.id && hasInitialLoaded(session.user.id)) {
            const timeoutId = setTimeout(() => {
                syncToCloud();
            }, 2000); // Debounce 2 секунды

            return () => clearTimeout(timeoutId);
        }
    }, [transactions, budgets, goals]);

    // Устанавливаем глобальный триггер синхронизации
    useEffect(() => {
        if (enabled && session?.user?.id) {
            setGlobalSyncTrigger(syncToCloud);
        }
        return () => {
            setGlobalSyncTrigger(async () => {});
        };
    }, [enabled, session?.user?.id]);

    return {
        status,
        syncNow: syncToCloud,
        loadFromCloud: syncFromCloud
    };
};

