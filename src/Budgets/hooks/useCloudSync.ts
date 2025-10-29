import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useFinanceStore } from '../store/useFinanceStore';
import { useGoalsStore } from '../store/useGoalsStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useAuth } from './useAuth';
import type { Transaction, Budget } from '../types';
import type { Goal } from '../types';
import { setGlobalSyncTrigger } from '../utils/cloudSyncTrigger';
import { migrateGoalIcon } from '../utils/migrationHelpers';

interface SupabaseTransaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: string;
    created_at: string;
    user_id: string;
}

interface SupabaseBudget {
    id: string;
    category: string;
    limit_amount: number;
    period: 'monthly' | 'weekly';
    user_id: string;
}

interface SupabaseGoal {
    id: string;
    name: string;
    description?: string;
    target_amount: number;
    current_amount: number;
    is_completed: boolean;
    deadline?: string;
    icon?: string;
    created_at: string;
    user_id: string;
}

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
    
    const avatar = useSettingsStore(state => state.avatar);
    const nickname = useSettingsStore(state => state.nickname);
    const notificationTime = useSettingsStore(state => state.notificationTime);
    const dailyReminderEnabled = useSettingsStore(state => state.dailyReminderEnabled);
    const notificationsEnabled = useSettingsStore(state => state.notificationsEnabled);
    const setAvatar = useSettingsStore(state => state.setAvatar);
    const setNickname = useSettingsStore(state => state.setNickname);
    const setNotificationTime = useSettingsStore(state => state.setNotificationTime);
    const setDailyReminderEnabled = useSettingsStore(state => state.setDailyReminderEnabled);
    const setNotificationsEnabled = useSettingsStore(state => state.setNotificationsEnabled);

    // Флаг для предотвращения синхронизации во время загрузки данных из облака
    const isLoadingFromCloudRef = useRef(false);

    const syncFromCloud = async () => {
        if (!session?.user?.id || !enabled) return;

        isLoadingFromCloudRef.current = true;
        setStatus(prev => ({ ...prev, isSyncing: true, error: null }));

        try {
            const { data: transactionsData, error: txError } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', session.user.id);

            if (txError) throw txError;

            const { data: budgetsData, error: budgetError } = await supabase
                .from('budgets')
                .select('*')
                .eq('user_id', session.user.id);

            if (budgetError) throw budgetError;

            const { data: goalsData, error: goalsError } = await supabase
                .from('goals')
                .select('*')
                .eq('user_id', session.user.id);

            if (goalsError) throw goalsError;

            if (transactionsData) {
                const parsedTransactions: Transaction[] = (transactionsData as SupabaseTransaction[]).map((tx) => ({
                    ...tx,
                    date: new Date(tx.date),
                    createdAt: new Date(tx.created_at),
                }));
                setTransactions(parsedTransactions);
            }

            if (budgetsData) {
                const parsedBudgets: Budget[] = (budgetsData as SupabaseBudget[]).map((b) => ({
                    ...b,
                    limit: b.limit_amount, // Map DB column to app field
                    limitAmount: b.limit_amount,
                }));
                setBudgets(parsedBudgets);
            }

            if (goalsData) {
                const parsedGoals: Goal[] = (goalsData as SupabaseGoal[]).map((g) => ({
                    id: g.id,
                    name: g.name,
                    description: g.description,
                    targetAmount: g.target_amount,
                    currentAmount: g.current_amount,
                    isCompleted: g.is_completed,
                    targetDate: g.deadline ? new Date(g.deadline) : undefined,
                    icon: migrateGoalIcon(g.icon || undefined),
                    createdAt: new Date(g.created_at),
                }));
                setGoals(parsedGoals);
            }

            try {
                const { data: settingsData, error: settingsError } = await supabase
                    .from('user_settings')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .single();

                if (!settingsError && settingsData) {
                    if (settingsData.avatar) setAvatar(settingsData.avatar);
                    if (settingsData.nickname) setNickname(settingsData.nickname);
                    if (settingsData.notification_time) setNotificationTime(settingsData.notification_time);
                    if (typeof settingsData.daily_reminder_enabled === 'boolean') setDailyReminderEnabled(settingsData.daily_reminder_enabled);
                    if (typeof settingsData.notifications_enabled === 'boolean') setNotificationsEnabled(settingsData.notifications_enabled);
                }
            } catch (settingsErr) {
                console.log('User settings not found or error loading, using local settings');
            }

            setStatus({
                isSyncing: false,
                lastSync: new Date(),
                error: null
            });
                } catch (error) {
                    console.error('Sync from cloud error:', error);
                    const errorMessage = error instanceof Error ? error.message : 'Sync failed';
                    console.error('Error details:', errorMessage);
                    setStatus({
                        isSyncing: false,
                        lastSync: null,
                        error: errorMessage
                    });
                } finally {
                    // Сбрасываем флаг после небольшой задержки, чтобы избежать немедленной синхронизации
                    setTimeout(() => {
                        isLoadingFromCloudRef.current = false;
                    }, 3000);
                }
    };

    const syncToCloud = async () => {
        if (!session?.user?.id || !enabled) return;

        setStatus(prev => ({ ...prev, isSyncing: true, error: null }));

        try {
            const transactionsForDB = transactions.map(tx => ({
                id: tx.id,
                user_id: session.user.id,
                type: tx.type,
                amount: tx.amount,
                category: tx.category,
                description: tx.description || null,
                date: tx.date instanceof Date ? tx.date.toISOString() : new Date(tx.date).toISOString(),
                created_at: tx.createdAt instanceof Date ? tx.createdAt.toISOString() : new Date(tx.createdAt).toISOString(),
            }));

            const { error: txError } = await supabase
                .from('transactions')
                .upsert(transactionsForDB, { onConflict: 'id' });

            if (txError) throw txError;

            const budgetsForDB = budgets.map(budget => ({
                id: budget.id,
                user_id: session.user.id,
                category: budget.category,
                limit_amount: budget.limit,
                period: budget.period,
            }));

            const { error: budgetError } = await supabase
                .from('budgets')
                .upsert(budgetsForDB, { onConflict: 'id' });

            if (budgetError) throw budgetError;

            const goalsForDB = goals.map(goal => ({
                id: goal.id,
                user_id: session.user.id,
                name: goal.name,
                description: goal.description || null,
                target_amount: goal.targetAmount,
                current_amount: goal.currentAmount,
                deadline: goal.targetDate 
                    ? (goal.targetDate instanceof Date ? goal.targetDate.toISOString() : new Date(goal.targetDate).toISOString())
                    : null,
                icon: goal.icon || null,
                is_completed: goal.isCompleted,
                created_at: goal.createdAt instanceof Date ? goal.createdAt.toISOString() : new Date(goal.createdAt).toISOString(),
            }));

            const { error: goalsError } = await supabase
                .from('goals')
                .upsert(goalsForDB, { onConflict: 'id' });

            if (goalsError) throw goalsError;

            try {
                const settingsForDB = {
                    user_id: session.user.id,
                    avatar: avatar || null,
                    nickname: nickname || '',
                    notification_time: notificationTime,
                    daily_reminder_enabled: dailyReminderEnabled,
                    notifications_enabled: notificationsEnabled,
                };

                const { error: settingsError } = await supabase
                    .from('user_settings')
                    .upsert(settingsForDB, { onConflict: 'user_id' });

                if (settingsError) {
                    console.log('Settings sync error (non-critical):', settingsError.message);
                }
            } catch (settingsErr) {
                console.log('Settings sync error (non-critical):', settingsErr);
            }

            setStatus({
                isSyncing: false,
                lastSync: new Date(),
                error: null
            });
        } catch (error) {
            console.error('Sync to cloud error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Sync failed';
            console.error('Error details:', errorMessage);
            
            if (error instanceof Error && error.message.includes('relation')) {
                console.error('❌ Таблицы не созданы в Supabase! Выполните SQL миграцию из supabase_migration.sql');
            } else if (error instanceof Error && error.message.includes('policy')) {
                console.error('❌ RLS политики блокируют доступ! Проверьте настройки безопасности в Supabase');
            }
            
            setStatus({
                isSyncing: false,
                lastSync: null,
                error: errorMessage
            });
            throw error; // Пробрасываем ошибку наружу
        }
    };

    const prevUserIdRef = useRef<string | null>(null);
    
    useEffect(() => {
        if (enabled && session?.user?.id) {
            const userChanged = prevUserIdRef.current !== session.user.id;
            prevUserIdRef.current = session.user.id;
            
            if (userChanged || !hasInitialLoaded(session.user.id)) {
                console.log('🔄 Loading data from cloud for user:', session.user.id);
                syncFromCloud().then(() => {
                    markInitialLoaded(session.user.id);
                });
            }
        }
    }, [enabled, session?.user?.id]);

    useEffect(() => {
        if (enabled && session?.user?.id && hasInitialLoaded(session.user.id)) {
            const interval = setInterval(() => {
                syncToCloud();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [enabled, session?.user?.id]);
    
    useEffect(() => {
        if (enabled && session?.user?.id && hasInitialLoaded(session.user.id) && !isLoadingFromCloudRef.current) {
            const timeoutId = setTimeout(() => {
                syncToCloud();
            }, 2000); // Debounce 2 секунды

            return () => clearTimeout(timeoutId);
        }
    }, [transactions.length, budgets.length, goals.length, enabled, session?.user?.id]);

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