import React from 'react';
import {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    IconButton,
    List,
    Switch,
    Typography
} from '@mui/material';
import {Add, Delete, Edit, Repeat, Schedule, Warning} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from "../../../Budgets/store/useSettingsStore.ts";
import {useRecurringStore} from "../../../Budgets/store/useRecurringStore.ts";
import {useFinanceStore} from "../../../Budgets/store/useFinanceStore.ts";
import {useThemeMode} from "../../../Budgets/theme/ThemeContext";
import {formatCurrency} from "../../../Budgets/utils/formatters.ts";
import {RecurringTransactionForm} from "./RecurringTransactionForm.tsx";
import {RecurringTransaction} from "../../../Budgets/types/recurring.ts";

export const RecurringTransactions: React.FC = () => {
    const {t} = useTranslation();
    const {currency} = useSettingsStore();
    const {mode} = useThemeMode();

    const recurring = useRecurringStore(state => state.recurring);
    const toggleRecurring = useRecurringStore(state => state.toggleRecurring);
    const deleteRecurring = useRecurringStore(state => state.deleteRecurring);
    const getDueRecurring = useRecurringStore(state => state.getDueRecurring);
    const updateRecurring = useRecurringStore(state => state.updateRecurring);
    const addTransaction = useFinanceStore(state => state.addTransaction);

    const [formOpen, setFormOpen] = useState(false);
    const dueRecurring = getDueRecurring();

    // Функции форматирования должны быть внутри компонента чтобы иметь доступ к t()
    const formatNextDue = (dateString?: string) => {
        if (!dateString) return '-';

        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return t('overdue');
        if (diffDays === 0) return t('today');
        if (diffDays === 1) return t('tomorrow');
        return `${diffDays} ${t('daysLeft')}`;
    };

    const formatEndDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    const handleCreateDueTransactions = () => {
        const now = new Date();

        dueRecurring.forEach(rec => {
            // Добавляем транзакцию
            addTransaction({
                amount: rec.amount,
                category: rec.category,
                description: rec.description ? `${rec.description} (автоматически)` : '(автоматически)',
                date: now,
                type: rec.type,
            });

            // Обновляем lastCreated в сторе повторяющихся транзакций
            updateRecurring(rec.id, {lastCreated: now.toISOString()}); // Конвертируем в ISO string
        });
    };

    const getFrequencyLabel = (freq: RecurringTransaction['frequency']) => {
        const labels: Record<string, string> = {
            daily: t('daily'),
            weekly: t('weekly'),
            monthly: t('monthly'),
            yearly: t('yearly')
        };
        return labels[freq] || freq;
    };

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            {/* Заголовок */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {t('recurringTransactions')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {t('recurringDescription')}
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<Add/>} 
                    onClick={() => setFormOpen(true)}
                    sx={{
                 background: mode === 'dark'
                     ? 'rgba(6, 0, 171, 0.5)'
                     : 'rgba(234, 234, 244, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#0600AB',
                        fontWeight: 'bold',
                        '&:hover': {
                     background: mode === 'dark'
                         ? 'rgba(6, 0, 171, 0.7)'
                         : 'rgba(234, 234, 244, 0.7)',
                            transform: 'translateY(-2px)',
                     boxShadow: mode === 'dark'
                         ? '0 6px 20px rgba(6, 0, 171, 0.4)'
                         : '0 6px 20px rgba(234, 234, 244, 0.4)',
                        }
                    }}
                >
                    {t('addRecurring')}
                </Button>
            </Box>

            {/* Предстоящие платежи */}
            {dueRecurring.length > 0 && (
                <Alert
                    severity="info"
                    sx={{mb: 3}}
                    action={
                        <Button color="inherit" size="small" onClick={handleCreateDueTransactions}>
                            {t('createAll')}
                        </Button>
                    }
                >
                    <Typography variant="subtitle2" fontWeight="bold">
                        {t('dueTransactions')}: {dueRecurring.length}
                    </Typography>
                    <Typography variant="body2">{t('dueTransactionsHint')}</Typography>
                </Alert>
            )}

            {/* Список повторяющихся транзакций */}
            {recurring.length === 0 ? (
                <Card elevation={2}>
                    <CardContent sx={{textAlign: 'center', py: 8}}>
                        <Repeat sx={{fontSize: 64, color: 'text.secondary', mb: 2}}/>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {t('noRecurringTransactions')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                            {t('addFirstRecurring')}
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<Add/>} 
                            onClick={() => setFormOpen(true)}
                            sx={{
                 background: mode === 'dark'
                     ? 'rgba(6, 0, 171, 0.5)'
                     : 'rgba(234, 234, 244, 0.5)',
                                color: mode === 'dark' ? '#FCF9F9' : '#0600AB',
                                fontWeight: 'bold',
                                '&:hover': {
                     background: mode === 'dark'
                         ? 'rgba(6, 0, 171, 0.7)'
                         : 'rgba(234, 234, 244, 0.7)',
                                    transform: 'translateY(-2px)',
                     boxShadow: mode === 'dark'
                         ? '0 6px 20px rgba(6, 0, 171, 0.4)'
                         : '0 6px 20px rgba(234, 234, 244, 0.4)',
                                }
                            }}
                        >
                            {t('addRecurring')}
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <List sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    {recurring.map((rec) => {
                        const isDue = dueRecurring.some(d => d.id === rec.id);

                        return (
                            <Card key={rec.id} elevation={2}>
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Box sx={{flex: 1}}>
                                            {/* Заголовок */}
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {rec.description || t(`category.${rec.category}`)}
                                                </Typography>
                                                {isDue && <Chip label={t('due')} color="warning" size="small"
												                icon={<Warning/>}/>}
                                                {!rec.isActive &&
													<Chip label={t('inactive')} size="small" variant="outlined"/>}
                                            </Box>

                                            {/* Детали */}
                                            <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2}}>
                                                <Chip
                                                    label={formatCurrency(rec.amount, currency)}
                                                    color={rec.type === 'income' ? 'success' : 'error'}
                                                    size="small"
                                                />
                                                <Chip label={t(`category.${rec.category}`)} variant="outlined"
                                                      size="small"/>
                                                <Chip label={getFrequencyLabel(rec.frequency)}
                                                      icon={<Repeat fontSize="small"/>} size="small"/>
                                            </Box>

                                            {/* Следующий платеж */}
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Schedule fontSize="small" color="action"/>
                                                <Typography variant="body2" color="text.secondary">
                                                    {t('nextPayment')}: {formatNextDue(rec.nextDue)}
                                                </Typography>
                                            </Box>

                                            {rec.endDate && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {t('until')}: {formatEndDate(rec.endDate)}
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Действия */}
                                        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                            <Switch
                                                checked={rec.isActive}
                                                onChange={() => toggleRecurring(rec.id)}
                                                color="primary"
                                            />
                                            <IconButton size="small" onClick={() => { /* TODO: Edit */
                                            }}>
                                                <Edit/>
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => {
                                                    if (confirm(t('confirmDeleteRecurring'))) {
                                                        deleteRecurring(rec.id);
                                                    }
                                                }}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })}
                </List>
            )}

            {/* Форма создания */}
            <RecurringTransactionForm open={formOpen} onClose={() => setFormOpen(false)}/>
        </Container>
    );
};