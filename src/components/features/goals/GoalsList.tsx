import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    LinearProgress,
    Chip,
    Stack,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore';
import { useGoalsStore } from '../../../Budgets/store/useGoalsStore';
import { Goal } from '../../../Budgets/types';
import { formatCurrency } from '../../../Budgets/utils/formatters';

interface GoalsListProps {
    onEditGoal: (goal: Goal) => void;
    onAddGoal: () => void;
}

export const GoalsList: React.FC<GoalsListProps> = ({ onEditGoal, onAddGoal }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const { currency } = useSettingsStore();
    const goals = useGoalsStore((state) => state.goals);
    const deleteGoal = useGoalsStore((state) => state.deleteGoal);

    const sortedGoals = [...goals].sort((a, b) => {
        // Сначала незавершенные цели, затем завершенные
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        // Затем по дате создания (новые сверху)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const handleDelete = (id: string) => {
        if (window.confirm(t('confirmDeleteGoal', 'Вы уверены, что хотите удалить эту цель?'))) {
            deleteGoal(id);
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 100) return 'success';
        if (percentage >= 75) return 'primary';
        if (percentage >= 50) return 'warning';
        return 'error';
    };

    const getDaysLeft = (targetDate?: Date) => {
        if (!targetDate) return null;
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return daysLeft;
    };

    if (goals.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ 
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)', 
                    mb: 2 
                }}>
                    {t('noGoals', 'У вас пока нет целей')}
                </Typography>
                <Typography variant="body2" sx={{ 
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.5)' : 'rgba(101, 70, 51, 0.5)',
                    mb: 3
                }}>
                    {t('createFirstGoal', 'Создайте свою первую цель для начала накоплений')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddGoal}
                    sx={{
                        backgroundColor: mode === 'dark' 
                            ? 'rgba(100, 200, 150, 0.8)'
                            : 'rgba(254, 222, 233, 0.8)',
                        color: mode === 'dark' ? '#1A3A2A' : '#654633',
                        fontWeight: '600',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: mode === 'dark' 
                                ? 'rgba(100, 200, 150, 0.9)'
                                : 'rgba(254, 222, 233, 0.9)',
                            transform: 'translateY(-2px)',
                        }
                    }}
                >
                    {t('createGoal', 'Создать цель')}
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Stack spacing={3}>
                {sortedGoals.map((goal) => {
                    const percentage = (goal.currentAmount / goal.targetAmount) * 100;
                    const daysLeft = getDaysLeft(goal.targetDate);
                    
                    return (
                        <Card
                            key={goal.id}
                            sx={{
                                borderRadius: 3,
                                background: mode === 'dark' 
                                    ? 'rgba(101, 70, 51, 0.8)'
                                    : 'rgba(234, 234, 244, 0.8)',
                                color: mode === 'dark' ? '#FCF9F9' : '#654633',
                                border: mode === 'dark' 
                                    ? '1px solid rgba(101, 70, 51, 0.3)'
                                    : '1px solid rgba(234, 234, 244, 0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: mode === 'dark' 
                                        ? '0 8px 25px rgba(101, 70, 51, 0.3)'
                                        : '0 8px 25px rgba(234, 234, 244, 0.3)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ 
                                            color: mode === 'dark' ? '#FCF9F9' : '#654633',
                                            mb: 1
                                        }}>
                                            {goal.name}
                                        </Typography>
                                        {goal.description && (
                                            <Typography variant="body2" sx={{ 
                                                color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)',
                                                mb: 2
                                            }}>
                                                {goal.description}
                                            </Typography>
                                        )}
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => onEditGoal(goal)}
                                            sx={{
                                                color: mode === 'dark' ? 'rgba(100, 200, 150, 0.8)' : 'rgba(254, 222, 233, 0.8)',
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' 
                                                        ? 'rgba(100, 200, 150, 0.1)' 
                                                        : 'rgba(254, 222, 233, 0.1)',
                                                }
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(goal.id)}
                                            sx={{
                                                color: mode === 'dark' ? 'rgba(220, 100, 100, 0.8)' : 'rgba(255, 185, 141, 0.8)',
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' 
                                                        ? 'rgba(220, 100, 100, 0.1)' 
                                                        : 'rgba(255, 185, 141, 0.1)',
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Прогресс бар */}
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" sx={{ 
                                            color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.8)',
                                            fontWeight: 'bold'
                                        }}>
                                            {formatCurrency(goal.currentAmount, currency)} / {formatCurrency(goal.targetAmount, currency)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ 
                                            color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.8)',
                                            fontWeight: 'bold'
                                        }}>
                                            {percentage.toFixed(1)}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(percentage, 100)}
                                        color={getProgressColor(percentage) as any}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(255, 255, 255, 0.1)' 
                                                : 'rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Box>

                                {/* Статус и дата */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Chip
                                            label={goal.isCompleted ? t('completed', 'Завершено') : t('inProgress', 'В процессе')}
                                            size="small"
                                            sx={{
                                                backgroundColor: goal.isCompleted 
                                                    ? (mode === 'dark' ? 'rgba(100, 200, 150, 0.3)' : 'rgba(254, 222, 233, 0.5)')
                                                    : (mode === 'dark' ? 'rgba(255, 185, 141, 0.3)' : 'rgba(255, 185, 141, 0.5)'),
                                                color: mode === 'dark' ? '#FCF9F9' : '#654633',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        {daysLeft !== null && (
                                            <Chip
                                                label={daysLeft > 0 ? `${daysLeft} ${t('daysLeft', 'дней осталось')}` : t('overdue', 'Просрочено')}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: daysLeft > 0 
                                                        ? (mode === 'dark' ? 'rgba(100, 200, 150, 0.5)' : 'rgba(254, 222, 233, 0.5)')
                                                        : (mode === 'dark' ? 'rgba(220, 100, 100, 0.5)' : 'rgba(255, 185, 141, 0.5)'),
                                                    color: daysLeft > 0 
                                                        ? (mode === 'dark' ? 'rgba(100, 200, 150, 0.8)' : 'rgba(254, 222, 233, 0.8)')
                                                        : (mode === 'dark' ? 'rgba(220, 100, 100, 0.8)' : 'rgba(255, 185, 141, 0.8)'),
                                                }}
                                            />
                                        )}
                                    </Box>
                                    
                                    {goal.targetDate && (
                                        <Typography variant="caption" sx={{ 
                                            color: mode === 'dark' ? 'rgba(252, 249, 249, 0.5)' : 'rgba(101, 70, 51, 0.5)'
                                        }}>
                                            {t('targetDate', 'Цель до')}: {goal.targetDate.toLocaleDateString('ru-RU')}
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
};
