import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useFinanceStore } from '../store/useFinanceStore';
import { useGoalsStore } from '../store/useGoalsStore';
import { useAuth } from './useAuth';

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

    const { session } = useAuth();
    const transactions = useFinanceStore(state => state.transactions);
    const budgets = useFinanceStore(state => state.budgets);
    const goals = useGoalsStore(state => state.goals);

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

            // Обновляем локальное состояние (если данные есть)
            if (transactionsData && transactionsData.length > 0) {
                useFinanceStore.setState({ transactions: transactionsData });
            }

            if (budgetsData && budgetsData.length > 0) {
                useFinanceStore.setState({ budgets: budgetsData });
            }

            if (goalsData && goalsData.length > 0) {
                useGoalsStore.setState({ goals: goalsData });
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
            // Сохранение транзакций
            const transactionsWithUserId = transactions.map(tx => ({
                ...tx,
                user_id: session.user.id
            }));

            const { error: txError } = await supabase
                .from('transactions')
                .upsert(transactionsWithUserId, { onConflict: 'id' });

            if (txError) throw txError;

            // Сохранение бюджетов
            const budgetsWithUserId = budgets.map(budget => ({
                ...budget,
                user_id: session.user.id
            }));

            const { error: budgetError } = await supabase
                .from('budgets')
                .upsert(budgetsWithUserId, { onConflict: 'id' });

            if (budgetError) throw budgetError;

            // Сохранение целей
            const goalsWithUserId = goals.map(goal => ({
                ...goal,
                user_id: session.user.id
            }));

            const { error: goalsError } = await supabase
                .from('goals')
                .upsert(goalsWithUserId, { onConflict: 'id' });

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

    // Автоматическая синхронизация при изменениях
    useEffect(() => {
        if (enabled && session?.user?.id) {
            // Загружаем данные при включении синхронизации
            syncFromCloud();

            // Автосохранение каждые 30 секунд
            const interval = setInterval(() => {
                syncToCloud();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [enabled, session?.user?.id]);

    // Синхронизация при изменении данных
    useEffect(() => {
        if (enabled && session?.user?.id && transactions.length > 0) {
            const timeoutId = setTimeout(() => {
                syncToCloud();
            }, 2000); // Debounce 2 секунды

            return () => clearTimeout(timeoutId);
        }
    }, [transactions, budgets, goals, enabled, session?.user?.id]);

    return {
        status,
        syncNow: syncToCloud,
        loadFromCloud: syncFromCloud
    };
};

