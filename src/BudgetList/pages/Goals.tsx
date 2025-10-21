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
    { id: 'travel', icon: FlightIcon, name: 'Путешествие', color: '#4ECDC4' },
    { id: 'home', icon: HomeIcon, name: 'Жильё', color: '#A8A3F6' },
    { id: 'car', icon: DirectionsCarIcon, name: 'Автомобиль', color: '#96CEB4' },
    { id: 'education', icon: SchoolIcon, name: 'Образование', color: '#FFEAA7' },
    { id: 'wedding', icon: FavoriteIcon, name: 'Свадьба', color: '#F6D5EE' },
    { id: 'laptop', icon: LaptopMacIcon, name: 'Техника', color: '#6366F1' },
    { id: 'jewelry', icon: DiamondIcon, name: 'Украшения', color: '#F6D5EE' },
    { id: 'savings', icon: SavingsIcon, name: 'Накопления', color: '#96CEB4' },
    { id: 'vacation', icon: BeachAccessIcon, name: 'Отпуск', color: '#4ECDC4' },
    { id: 'phone', icon: PhoneIphoneIcon, name: 'Телефон', color: '#8B5CF6' },
    { id: 'camera', icon: CameraAltIcon, name: 'Камера', color: '#6366F1' },
    { id: 'fitness', icon: FitnessCenterIcon, name: 'Фитнес', color: '#96CEB4' },
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
            targetDate: targetDate || undefined,
            icon: selectedIcon,
        };

        if (editingGoal) {
            updateGoal(editingGoal, goalData);
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
                        color: mode === 'dark' ? '#FFFFFF' : '#243168',
                        mb: 1
                    }}
                >
                    {t('savings', 'Копилка')}
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.6)',
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
                            ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                            : 'linear-gradient(135deg, #A8A3F6 0%, #F6D5EE 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px rgba(99, 102, 241, 0.4)'
                            : '0 8px 24px rgba(168, 163, 246, 0.4)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 32px rgba(99, 102, 241, 0.5)'
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
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.7)', 
                            mb: 1
                        }}
                    >
                        У вас пока нет копилок
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(36, 49, 104, 0.5)'
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
                            <Grid item xs={12} sm={12} md={12} lg={6} key={goal.id}>
                                <GlassCard 
                                    glowColor={iconData.color + '40'}
                                    sx={{ 
                                        aspectRatio: '1 / 1',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        opacity: goal.isCompleted ? 0.7 : 1,
                                    }}
                                >
                                    <Box sx={{ p: 3 }}>
                                        {/* Верхняя часть с иконкой и действиями */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                            <Box 
                                                sx={{ 
                                                    width: 56, 
                                                    height: 56, 
                                                    borderRadius: 3,
                                                    background: `linear-gradient(135deg, ${iconData.color}20 0%, ${iconData.color}40 100%)`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <IconComponent sx={{ fontSize: 32, color: iconData.color }} />
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditGoal(goal.id)}
                                                    sx={{
                                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)',
                                                        '&:hover': {
                                                            color: iconData.color,
                                                            backgroundColor: `${iconData.color}20`,
                                                        }
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteGoal(goal.id)}
                                                    sx={{
                                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)',
                                                        '&:hover': {
                                                            color: '#FF6B6B',
                                                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        {/* Название и описание */}
                                        <Typography 
                                            variant="h6" 
                                            fontWeight="600"
                                            sx={{ 
                                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                                mb: 0.5
                                            }}
                                        >
                                            {goal.name}
                                        </Typography>
                                        {goal.description && (
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)',
                                                    mb: 2
                                                }}
                                            >
                                                {goal.description}
                                            </Typography>
                                        )}

                                        {/* Прогресс */}
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight="600"
                                                    sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(36, 49, 104, 0.8)' }}
                                                >
                                                    {formatCurrency(goal.currentAmount, currency)}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight="600"
                                                    sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)' }}
                                                >
                                                    {formatCurrency(goal.targetAmount, currency)}
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(percentage, 100)}
                                                sx={{
                                                    height: 8,
                                                    borderRadius: 4,
                                                    backgroundColor: mode === 'dark' 
                                                        ? 'rgba(255, 255, 255, 0.1)' 
                                                        : 'rgba(36, 49, 104, 0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        borderRadius: 4,
                                                        background: `linear-gradient(90deg, ${iconData.color} 0%, ${iconData.color}CC 100%)`,
                                                    }
                                                }}
                                            />
                                        </Box>

                                        {/* Информация */}
                                        <Stack spacing={1}>
                                            {daysLeft !== null && (
                                                <Chip
                                                    label={daysLeft > 0 ? `${daysLeft} ${daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'} до цели` : 'Срок истёк'}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: daysLeft > 0 
                                                            ? `${iconData.color}20`
                                                            : 'rgba(255, 107, 107, 0.2)',
                                                        color: daysLeft > 0 
                                                            ? iconData.color
                                                            : '#FF6B6B',
                                                        fontWeight: 600,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            )}
                                            {recommendedDaily && recommendedDaily > 0 && (
                                                <Box 
                                                    sx={{ 
                                                        p: 1.5, 
                                                        borderRadius: 2,
                                                        backgroundColor: mode === 'dark' 
                                                            ? 'rgba(255, 255, 255, 0.05)' 
                                                            : 'rgba(36, 49, 104, 0.05)',
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)',
                                                            display: 'block',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        Рекомендуется откладывать:
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2" 
                                                        fontWeight="600"
                                                        sx={{ color: iconData.color }}
                                                    >
                                                        {formatCurrency(recommendedDaily, currency)} / день
                </Typography>
                                                </Box>
                                            )}
                                        </Stack>
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
                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
                    fontWeight: 600,
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
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.7)',
                                    mb: 1.5,
                                    fontWeight: 500
                                }}
                            >
                                Выберите иконку:
                </Typography>
                            <Grid container spacing={1.5}>
                                {GOAL_ICONS.map((iconData) => {
                                    const IconComp = iconData.icon;
                                    return (
                                        <Grid item xs={3} sm={2} key={iconData.id}>
                                            <Box
                                                onClick={() => setSelectedIcon(iconData.id)}
                                                sx={{
                                                    width: '100%',
                                                    aspectRatio: '1',
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    background: selectedIcon === iconData.id
                                                        ? `linear-gradient(135deg, ${iconData.color}40 0%, ${iconData.color}60 100%)`
                                                        : mode === 'dark'
                                                            ? 'rgba(255, 255, 255, 0.05)'
                                                            : 'rgba(36, 49, 104, 0.05)',
                                                    border: selectedIcon === iconData.id
                                                        ? `2px solid ${iconData.color}`
                                                        : '2px solid transparent',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        background: `linear-gradient(135deg, ${iconData.color}30 0%, ${iconData.color}50 100%)`,
                                                    }
                                                }}
                                            >
                                                <IconComp sx={{ fontSize: 28, color: iconData.color }} />
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

                        {/* Целевая сумма */}
                        <TextField
                            label="Целевая сумма"
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
                                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.7)',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                            }
                                        }
                                    },
                                    popper: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                backgroundColor: mode === 'dark' ? 'rgba(15, 15, 35, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                                                backdropFilter: 'blur(20px)',
                                                border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(36, 49, 104, 0.2)',
                                                borderRadius: 3,
                                                boxShadow: mode === 'dark'
                                                    ? '0 12px 40px rgba(0, 0, 0, 0.5)'
                                                    : '0 12px 40px rgba(36, 49, 104, 0.2)',
                                            },
                                            '& .MuiPickersDay-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                                '&.Mui-selected': {
                                                    backgroundColor: mode === 'dark' ? '#6366F1' : '#A8A3F6',
                                                    '&:hover': {
                                                        backgroundColor: mode === 'dark' ? '#4F46E5' : '#8B85E8',
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: mode === 'dark' 
                                                        ? 'rgba(99, 102, 241, 0.2)' 
                                                        : 'rgba(168, 163, 246, 0.2)',
                                                }
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                            },
                                            '& .MuiDayCalendar-weekDayLabel': {
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.7)',
                                            },
                                            '& .MuiPickersYear-yearButton': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                                '&.Mui-selected': {
                                                    backgroundColor: mode === 'dark' ? '#6366F1' : '#A8A3F6',
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
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.7)',
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
                                    background: mode === 'dark' 
                                        ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                                        : 'linear-gradient(135deg, #A8A3F6 0%, #F6D5EE 100%)',
                                    color: '#FFFFFF',
                                    fontWeight: 600,
                                }}
                            >
                                {editingGoal ? 'Сохранить' : 'Создать'}
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Goals;
