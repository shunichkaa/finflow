import { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    Stack,
    Typography,
} from '@mui/material';
import {
    Close as CloseIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    TrendingUp as TrendingUpIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore';
import { useGoalsStore } from '../../../Budgets/store/useGoalsStore';
import { Goal } from '../../../Budgets/types';
import { NumberInput } from '../../ui/NumberInput';

interface GoalDetailProps {
    goal: Goal | null;
    open: boolean;
    onClose: () => void;
    onEdit?: () => void;
}

const motivationalPhrases = [
    { text: "Отличная работа! Ещё чуть-чуть!", emoji: "🎯" },
    { text: "Ты молодец! Цель всё ближе!", emoji: "💪" },
    { text: "Так держать! Прогресс налицо!", emoji: "✨" },
    { text: "Шаг за шагом к мечте!", emoji: "🌟" },
    { text: "Ты на верном пути!", emoji: "🚀" },
    { text: "Продолжай в том же духе!", emoji: "💎" },
    { text: "Каждый рубль приближает к цели!", emoji: "💰" },
    { text: "Ты справишься! Верь в себя!", emoji: "⭐" },
    { text: "Маленькие шаги = большой результат!", emoji: "🎪" },
    { text: "Твоя цель уже близко!", emoji: "🎁" },
];

export const GoalDetail: React.FC<GoalDetailProps> = ({ goal, open, onClose, onEdit }) => {
    const { mode } = useThemeMode();
    const { currency } = useSettingsStore();
    const { addToGoal } = useGoalsStore();
    
    const [amount, setAmount] = useState('');
    const [showMotivation, setShowMotivation] = useState(false);
    const [motivationText, setMotivationText] = useState('');

    if (!goal) return null;

    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;

    const daysRemaining = goal.targetDate 
        ? Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

    const dailyRecommendation = daysRemaining && daysRemaining > 0
        ? remaining / daysRemaining
        : 0;

    const handleAddFunds = () => {
        const amountNum = parseFloat(amount);
        if (amountNum > 0) {
            addToGoal(goal.id, amountNum);

            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            setMotivationText(randomPhrase.text + ' ' + randomPhrase.emoji);
            setShowMotivation(true);
            
            setAmount('');

            setTimeout(() => setShowMotivation(false), 3000);
        }
    };

    const handleWithdraw = () => {
        const amountNum = parseFloat(amount);
        if (amountNum > 0 && amountNum <= goal.currentAmount) {
            addToGoal(goal.id, -amountNum);
            setAmount('');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                },
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2,
            }}>
                <Typography 
                    variant="h4" 
                    fontWeight={700} 
                    sx={{ 
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                    }}
                >
                    {goal.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {onEdit && (
                        <IconButton 
                            onClick={() => {
                                onEdit();
                                onClose();
                            }} 
                            size="small"
                            sx={{
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                }
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }} />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                <Stack spacing={3}>
                    {/* Мотивационная фраза */}
                    {showMotivation && (
                        <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, rgba(181, 234, 215, 0.2) 0%, rgba(181, 234, 215, 0.4) 100%)',
                            border: '1px solid #B5EAD7',
                            textAlign: 'center',
                            animation: 'fadeIn 0.3s ease-in',
                            '@keyframes fadeIn': {
                                from: { opacity: 0, transform: 'translateY(-10px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}>
                            <Typography variant="h6" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E', whiteSpace: 'pre-line' }}>
                                {motivationText}
                            </Typography>
                        </Box>
                    )}

                    {/* Прогресс */}
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                Прогресс
                            </Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                {progress.toFixed(1)}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={Math.min(progress, 100)}
                            sx={{
                                height: 12,
                                borderRadius: 2,
                                bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: '#6C6FF9',
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="h6" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                {goal.currentAmount.toLocaleString()} {currency}
                            </Typography>
                            <Typography variant="h6" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)' }}>
                                {goal.targetAmount.toLocaleString()} {currency}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Статистика */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                    }}>
                        {/* Дни до цели */}
                        {daysRemaining !== null && (
                            <Box sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: 2,
                                background: mode === 'dark' 
                                    ? 'rgba(108, 111, 249, 0.1)' 
                                    : 'rgba(199, 206, 234, 0.2)',
                                border: `1px solid ${mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : '#C7CEEA'}`,
                            }}>
                                <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                    Дней до цели:
                                </Typography>
                                <Typography variant="h5" fontWeight={700} sx={{ color: daysRemaining > 0 ? '#6C6FF9' : '#FFB3BA' }}>
                                    {daysRemaining > 0 ? daysRemaining : 0}
                                </Typography>
                            </Box>
                        )}

                        {/* Осталось */}
                        <Box sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            background: mode === 'dark' 
                                ? 'rgba(108, 111, 249, 0.1)' 
                                : 'rgba(199, 206, 234, 0.2)',
                            border: `1px solid ${mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : '#C7CEEA'}`,
                        }}>
                            <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                Осталось:
                            </Typography>
                            <Typography variant="h5" fontWeight={700} sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                {remaining.toLocaleString()} {currency}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Рекомендация */}
                    {dailyRecommendation > 0 && (
                        <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, rgba(181, 234, 215, 0.1) 0%, rgba(181, 234, 215, 0.2) 100%)',
                            border: '1px solid #B5EAD7',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <TrendingUpIcon sx={{ color: '#B5EAD7', fontSize: 32 }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                    Рекомендуется откладывать
                                </Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                    {dailyRecommendation.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency} / день
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Описание */}
                    {goal.description && (
                        <Box>
                            <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                Описание
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E', mt: 0.5 }}>
                                {goal.description}
                            </Typography>
                        </Box>
                    )}

                    {/* Управление средствами */}
                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                            Управление средствами
                        </Typography>
                        <Stack spacing={2}>
                            <NumberInput
                                value={amount}
                                onChange={setAmount}
                                label="Сумма"
                                fullWidth
                                allowDecimal={true}
                                InputProps={{
                                    endAdornment: (
                                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(39, 43, 62, 0.6)' }}>
                                            {currency}
                                        </Typography>
                                    ),
                                }}
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<AddIcon />}
                                    onClick={handleAddFunds}
                                    disabled={!amount || parseFloat(amount) <= 0}
                                    sx={{
                                        background: '#6C6FF9',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            background: '#6C6FF9',
                                            boxShadow: '0 4px 12px rgba(108, 111, 249, 0.4)',
                                        },
                                    }}
                                >
                                    Добавить
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<RemoveIcon />}
                                    onClick={handleWithdraw}
                                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > goal.currentAmount}
                                    sx={{
                                        borderColor: '#6C6FF9',
                                        color: '#6C6FF9',
                                        '&:hover': {
                                            borderColor: '#6C6FF9',
                                            background: 'rgba(108, 111, 249, 0.05)',
                                        },
                                    }}
                                >
                                    Снять
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};