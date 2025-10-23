import React, { useState } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    Grid, 
    IconButton, 
    LinearProgress,
    Chip,
    Stack,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useTranslation } from "react-i18next";
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { useGoalsStore } from '../../Budgets/store/useGoalsStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { formatCurrency } from '../../Budgets/utils/formatters';
import { GoalDetail } from '../../components/features/goals/GoalDetail';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import DiamondIcon from '@mui/icons-material/Diamond';
import SavingsIcon from '@mui/icons-material/Savings';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Иконки для копилок
const GOAL_ICONS = [
    { id: 'travel', icon: FlightIcon, name: 'Путешествие', color: '#B5EAD7' },
    { id: 'home', icon: HomeIcon, name: 'Жильё', color: '#6C6FF9' },
    { id: 'car', icon: DirectionsCarIcon, name: 'Автомобиль', color: '#B5EAD7' },
    { id: 'education', icon: SchoolIcon, name: 'Образование', color: '#FFD7BA' },
    { id: 'wedding', icon: FavoriteIcon, name: 'Свадьба', color: '#6C6FF9' },
    { id: 'laptop', icon: LaptopMacIcon, name: 'Техника', color: '#6C6FF9' },
    { id: 'jewelry', icon: DiamondIcon, name: 'Украшения', color: '#6C6FF9' },
    { id: 'savings', icon: SavingsIcon, name: 'Накопления', color: '#B5EAD7' },
    { id: 'vacation', icon: BeachAccessIcon, name: 'Отпуск', color: '#B5EAD7' },
    { id: 'phone', icon: PhoneIphoneIcon, name: 'Телефон', color: '#6C6FF9' },
    { id: 'camera', icon: CameraAltIcon, name: 'Камера', color: '#6C6FF9' },
    { id: 'fitness', icon: FitnessCenterIcon, name: 'Фитнес', color: '#B5EAD7' },
];

const Goals: React.FC = () => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const { currency } = useSettingsStore();
    const goals = useGoalsStore((state) => state.goals);
    const addGoal = useGoalsStore((state) => state.addGoal);
    const updateGoal = useGoalsStore((state) => state.updateGoal);
    const deleteGoal = useGoalsStore((state) => state.deleteGoal);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('savings');
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [editingGoal, setEditingGoal] = useState<string | null>(null);
    
    // Детальный просмотр копилки
    const [selectedGoal, setSelectedGoal] = useState<any | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const formatNumberWithSpaces = (value: string): string => {
        // Удаляем все пробелы и нечисловые символы кроме точки
        const numericValue = value.replace(/[^\d.]/g, '');
        // Разделяем на целую и дробную часть
        const parts = numericValue.split('.');
        // Форматируем целую часть с пробелами
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        // Возвращаем с дробной частью если есть
        return parts.join('.');
    };

    const parseFormattedNumber = (value: string): number => {
        // Удаляем все пробелы и парсим число
        return parseFloat(value.replace(/\s/g, '')) || 0;
    };

    const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatNumberWithSpaces(e.target.value);
        setTargetAmount(formatted);
    };

    const handleCurrentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatNumberWithSpaces(e.target.value);
        setCurrentAmount(formatted);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setEditingGoal(null);
        setGoalName('');
        setTargetAmount('');
        setCurrentAmount('');
        setTargetDate(null);
        setSelectedIcon('savings');
    };

    const handleEditGoal = (goalId: string) => {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        setEditingGoal(goalId);
        setGoalName(goal.name);
        setTargetAmount(formatNumberWithSpaces(goal.targetAmount.toString()));
        setCurrentAmount(formatNumberWithSpaces(goal.currentAmount.toString()));
        setTargetDate(goal.targetDate ? new Date(goal.targetDate) : null);
        setSelectedIcon((goal as any).icon || 'savings');
        setOpenDialog(true);
    };

    const handleSaveGoal = () => {
        if (!goalName || !targetAmount) return;

        const goalData = {
            name: goalName,
            targetAmount: parseFormattedNumber(targetAmount),
            currentAmount: parseFormattedNumber(currentAmount),
            targetDate: targetDate ? targetDate : undefined,
            icon: selectedIcon,
        };

        if (editingGoal) {
            // При редактировании явно передаем все поля, включая targetDate
            updateGoal(editingGoal, {
                ...goalData,
                targetDate: targetDate ? targetDate : undefined,
            });
        } else {
            addGoal(goalData as any);
        }

        setOpenDialog(false);
        setGoalName('');
        setTargetAmount('');
        setCurrentAmount('');
        setTargetDate(null);
        setSelectedIcon('savings');
    };

    const handleDeleteGoal = (goalId: string) => {
        if (window.confirm('Вы уверены, что хотите удалить эту копилку?')) {
            deleteGoal(goalId);
        }
    };

    const getDaysLeft = (targetDate?: Date) => {
        if (!targetDate) return null;
        const now = new Date();
        const diff = new Date(targetDate).getTime() - now.getTime();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return daysLeft;
    };

    const getRecommendedDaily = (target: number, current: number, targetDate?: Date) => {
        if (!targetDate) return null;
        const daysLeft = getDaysLeft(targetDate);
        if (!daysLeft || daysLeft <= 0) return null;
        const remaining = target - current;
        return remaining / daysLeft;
    };

    const sortedGoals = [...goals].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <Container 
            maxWidth="xl" 
            sx={{ 
                py: {xs: 2, sm: 3}, 
                px: {xs: 1, sm: 2, md: 3},
            }}
        >
            {/* Заголовок */}
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    fontWeight="700"
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        mb: 1
                    }}
                >
                    {t('savings', 'Копилка')}
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.6)',
                    }}
                >
                    Создавайте копилки для накопления на важные цели
                </Typography>
            </Box>
            
            {/* Кнопка добавления */}
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    sx={{
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)'
                            : 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px rgba(108, 111, 249, 0.4)'
                            : '0 8px 24px rgba(168, 163, 246, 0.4)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 32px rgba(108, 111, 249, 0.5)'
                                : '0 12px 32px rgba(168, 163, 246, 0.5)',
                        }
                    }}
                >
                    Создать копилку
                </Button>
            </Box>

            {/* Список копилок */}
            {sortedGoals.length === 0 ? (
                <GlassCard sx={{ p: 8, textAlign: 'center' }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)', 
                            mb: 1
                        }}
                    >
                        У вас пока нет копилок
                </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(6, 0, 171, 0.5)'
                        }}
                    >
                        Создайте свою первую копилку для достижения целей
                    </Typography>
                </GlassCard>
            ) : (
                <Grid container spacing={3}>
                    {sortedGoals.map((goal) => {
                        const percentage = (goal.currentAmount / goal.targetAmount) * 100;
                        const daysLeft = getDaysLeft(goal.targetDate);
                        const recommendedDaily = getRecommendedDaily(goal.targetAmount, goal.currentAmount, goal.targetDate);
                        const iconData = GOAL_ICONS.find(i => i.id === (goal as any).icon) || GOAL_ICONS[7];
                        const IconComponent = iconData.icon;

                        return (
                            <Grid item xs={12} sm={6} md={4} key={goal.id}>
                                <GlassCard 
                                    glowColor={iconData.color + '40'}
                                    onClick={() => {
                                        setSelectedGoal(goal);
                                        setDetailOpen(true);
                                    }}
                                    sx={{ 
                                        height: '100%',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 8px 24px ${iconData.color}40`,
                                        },
                                        opacity: goal.isCompleted ? 0.7 : 1,
                                    }}
                                >
                                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                        {/* Иконка */}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                            <Box 
                                                sx={{ 
                                                    width: 64, 
                                                    height: 64, 
                                                    borderRadius: 3,
                                                    background: `linear-gradient(135deg, ${iconData.color}20 0%, ${iconData.color}40 100%)`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <IconComponent sx={{ fontSize: 36, color: iconData.color }} />
                                            </Box>
                                        </Box>

                                        {/* Название */}
                                        <Typography 
                                            variant="h5" 
                                            fontWeight="700"
                                            align="center"
                                            sx={{ 
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                mb: 2,
                                                minHeight: 48,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                            }}
                                        >
                                            {goal.name}
                                        </Typography>

                                        {/* Прогресс */}
                                        <Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(percentage, 100)}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 2,
                                                    mb: 1,
                                                    backgroundColor: mode === 'dark' 
                                                        ? 'rgba(255, 255, 255, 0.1)' 
                                                        : '#EFF0F6',
                                                    '& .MuiLinearProgress-bar': {
                                                        borderRadius: 2,
                                                        backgroundColor: iconData.color,
                                                    }
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight="600"
                                                    sx={{ 
                                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {goal.currentAmount.toLocaleString()}{' '}{currency}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight="500"
                                                    sx={{ 
                                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {goal.targetAmount.toLocaleString()}{' '}{currency}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </GlassCard>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {/* Диалог создания/редактирования */}
            <Dialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        background: mode === 'dark' 
                            ? 'rgba(15, 15, 35, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                    }
                }}
            >
                <DialogTitle sx={{ 
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    pb: 1
                }}>
                    {editingGoal ? 'Редактировать копилку' : 'Создать копилку'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        {/* Выбор иконки */}
                        <Box>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                    mb: 1.5,
                                    fontWeight: 500
                                }}
                            >
                                Выберите иконку:
                </Typography>
                            <Grid container spacing={2}>
                                {GOAL_ICONS.map((iconData) => {
                                    const IconComp = iconData.icon;
                                    const isSelected = selectedIcon === iconData.id;
                                    return (
                                        <Grid item xs={3} sm={2} key={iconData.id}>
                                            <Box
                                                onClick={() => setSelectedIcon(iconData.id)}
                                                sx={{
                                                    width: '100%',
                                                    aspectRatio: '1',
                                                    borderRadius: 3,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    background: isSelected
                                                        ? `linear-gradient(135deg, ${iconData.color}50 0%, ${iconData.color}70 100%)`
                                                        : mode === 'dark'
                                                            ? 'rgba(255, 255, 255, 0.05)'
                                                            : 'rgba(6, 0, 171, 0.05)',
                                                    border: isSelected
                                                        ? `3px solid ${iconData.color}`
                                                        : mode === 'dark'
                                                            ? '2px solid rgba(255, 255, 255, 0.1)'
                                                            : '2px solid rgba(6, 0, 171, 0.1)',
                                                    boxShadow: isSelected
                                                        ? `0 8px 24px ${iconData.color}40, 0 0 0 4px ${iconData.color}20`
                                                        : 'none',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                                    '&::before': isSelected ? {
                                                        content: '""',
                                                        position: 'absolute',
                                                        inset: -8,
                                                        borderRadius: 3,
                                                        background: `radial-gradient(circle at center, ${iconData.color}30 0%, transparent 70%)`,
                                                        animation: 'pulse 2s ease-in-out infinite',
                                                        zIndex: -1,
                                                    } : {},
                                                    '&:hover': {
                                                        transform: 'scale(1.15) translateY(-4px)',
                                                        background: `linear-gradient(135deg, ${iconData.color}40 0%, ${iconData.color}60 100%)`,
                                                        boxShadow: `0 12px 32px ${iconData.color}50, 0 0 0 3px ${iconData.color}30`,
                                                        border: `2px solid ${iconData.color}`,
                                                    },
                                                    '@keyframes pulse': {
                                                        '0%, 100%': {
                                                            opacity: 0.6,
                                                            transform: 'scale(1)',
                                                        },
                                                        '50%': {
                                                            opacity: 1,
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }
                                                }}
                                            >
                                                <IconComp 
                                                    sx={{ 
                                                        fontSize: 32, 
                                                        color: iconData.color,
                                                        filter: isSelected 
                                                            ? `drop-shadow(0 4px 8px ${iconData.color}60)`
                                                            : 'none',
                                                        transition: 'all 0.3s',
                                                    }} 
                                                />
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
            </Box>

                        {/* Название */}
                        <TextField
                            label="Название"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            fullWidth
                            required
                        />

                        {/* Итоговая сумма */}
                        <TextField
                            label="Итоговая сумма"
                            type="text"
                            value={targetAmount}
                            onChange={handleTargetAmountChange}
                            fullWidth
                            required
                            placeholder="1 000 000"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{currency}</InputAdornment>
                            }}
                        />

                        {/* Текущая сумма */}
                        <TextField
                            label="Текущая сумма"
                            type="text"
                            value={currentAmount}
                            onChange={handleCurrentAmountChange}
                            fullWidth
                            placeholder="500 000"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{currency}</InputAdornment>
                            }}
                        />

                        {/* Дата цели */}
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                            <DatePicker
                                label="Дата завершения"
                                value={targetDate}
                                onChange={(newValue) => setTargetDate(newValue)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        sx: {
                                            '& .MuiOutlinedInput-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            }
                                        }
                                    },
                                    popper: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                backgroundColor: mode === 'dark' ? 'rgba(15, 15, 35, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                                                backdropFilter: 'blur(20px)',
                                                border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(6, 0, 171, 0.2)',
                                                borderRadius: 3,
                                                boxShadow: mode === 'dark'
                                                    ? '0 12px 40px rgba(0, 0, 0, 0.5)'
                                                    : '0 12px 40px rgba(6, 0, 171, 0.2)',
                                            },
                                            '& .MuiPickersDay-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                '&.Mui-selected': {
                                                    backgroundColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                                    '&:hover': {
                                                        backgroundColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' 
                                                        ? 'rgba(108, 111, 249, 0.2)' 
                                                        : 'rgba(168, 163, 246, 0.2)',
                                                }
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            },
                                            '& .MuiDayCalendar-weekDayLabel': {
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                            },
                                            '& .MuiPickersYear-yearButton': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                '&.Mui-selected': {
                                                    backgroundColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </LocalizationProvider>

                        {/* Кнопки */}
                        <Stack direction="row" spacing={2}>
                            <Button
                                onClick={() => setOpenDialog(false)}
                                fullWidth
                                sx={{
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleSaveGoal}
                                variant="contained"
                                fullWidth
                                disabled={!goalName || !targetAmount}
                                sx={{
                                    background: '#6C6FF9',
                                    color: '#FFFFFF',
                                    fontWeight: 600,
                                    boxShadow: '0 2px 8px rgba(108, 111, 249, 0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        background: '#6C6FF9',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(108, 111, 249, 0.4)',
                                    }
                                }}
                            >
                                {editingGoal ? 'Сохранить' : 'Создать'}
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>

            {/* Детальный просмотр копилки */}
            <GoalDetail
                goal={selectedGoal}
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);
                    setSelectedGoal(null);
                }}
                onEdit={() => {
                    if (selectedGoal) {
                        handleEditGoal(selectedGoal.id);
                    }
                }}
            />
        </Container>
    );
};

export default Goals;
