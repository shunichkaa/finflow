import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Chip,
    Stack,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useGoalsStore } from '../../../Budgets/store/useGoalsStore';
import { Goal } from '../../../Budgets/types';
import { formatDate } from '../../../Budgets/utils/formatters';

interface GoalsListProps {
    onEditGoal: (goal: Goal) => void;
    onAddGoal: () => void;
}

export const GoalsList: React.FC<GoalsListProps> = ({ onEditGoal, onAddGoal }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
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
                    color: mode === 'dark' ? '#FFFFFFB3' : '#0600ABB3', 
                    mb: 2 
                }}>
                    {t('noGoals', 'У вас пока нет целей')}
                </Typography>
                <Typography variant="body2" sx={{ 
                    color: mode === 'dark' ? '#FFFFFF80' : '#0600AB80',
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
                            ? '#64C896CC'
                            : '#FEDEE9CC',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontWeight: '600',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: mode === 'dark' 
                                ? '#64C896E6'
                                : '#FEDEE9E6',
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
                    const _daysLeft = getDaysLeft(goal.targetDate);
                    
                    return (
                        <Card
                            key={goal.id}
                            sx={{
                                borderRadius: 3,
                                background: mode === 'dark' 
                                    ? '#0600ABCC'
                                    : '#EAEAF4CC',
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                border: mode === 'dark' 
                                    ? '1px solid #0600AB4D'
                                    : '1px solid #EAEAF44D',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: mode === 'dark' 
                                        ? '0 8px 25px #0600AB4D'
                                        : '0 8px 25px #EAEAF44D',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ 
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            mb: 1
                                        }}>
                                            {goal.name}
                                        </Typography>
                                        {goal.description && (
                                            <Typography variant="body2" sx={{ 
                                                color: mode === 'dark' ? '#FFFFFFB3' : '#0600ABB3',
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
                                                color: mode === 'dark' ? '#64C896CC' : '#FEDEE9CC',
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' 
                                                        ? '#64C8961A' 
                                                        : '#FEDEE91A',
                                                }
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(goal.id)}
                                            sx={{
                                                color: mode === 'dark' ? '#DC6464CC' : '#FFB98DCC',
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' 
                                                        ? '#DC64641A' 
                                                        : '#FFB98D1A',
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Chip
                                            label={goal.isCompleted ? t('completed', 'Завершено') : t('inProgress', 'В процессе')}
                                            size="small"
                                            sx={{
                                                backgroundColor: goal.isCompleted 
                                                    ? (mode === 'dark' ? '#64C8964D' : '#FEDEE980')
                                                    : (mode === 'dark' ? '#FFB98D4D' : '#FFB98D80'),
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        {_daysLeft !== null && (
                                            <Chip
                                                label={_daysLeft > 0 ? `${_daysLeft} ${t('daysLeft', 'дней осталось')}` : t('overdue', 'Просрочено')}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: _daysLeft > 0 
                                                        ? (mode === 'dark' ? '#64C89680' : '#FEDEE980')
                                                        : (mode === 'dark' ? '#DC646480' : '#FFB98D80'),
                                                    color: _daysLeft > 0 
                                                        ? (mode === 'dark' ? '#64C896CC' : '#FEDEE9CC')
                                                        : (mode === 'dark' ? '#DC6464CC' : '#FFB98DCC'),
                                                }}
                                            />
                                        )}
                                    </Box>
                                    
                                    {goal.targetDate && (
                                        <Typography variant="caption" sx={{ 
                                            color: mode === 'dark' ? '#FFFFFF80' : '#0600AB80'
                                        }}>
                                            {t('targetDate', 'Цель до')}: {formatDate(goal.targetDate)}
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