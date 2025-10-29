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
import { useTranslation } from 'react-i18next';
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
    { text: "motivation.excellent", emoji: "🎯" },
    { text: "motivation.great", emoji: "💪" },
    { text: "motivation.keepGoing", emoji: "✨" },
    { text: "motivation.stepByStep", emoji: "🌟" },
    { text: "motivation.rightPath", emoji: "🚀" },
    { text: "motivation.continue", emoji: "💎" },
    { text: "motivation.everyRub", emoji: "💰" },
    { text: "motivation.believe", emoji: "⭐" },
    { text: "motivation.smallSteps", emoji: "🎪" },
    { text: "motivation.almostThere", emoji: "🎁" },
];

export const GoalDetail: React.FC<GoalDetailProps> = ({ goal, open, onClose, onEdit }) => {
    const { t } = useTranslation();
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
            setMotivationText(t(randomPhrase.text) + ' ' + randomPhrase.emoji);
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
                    {/* Motivational phrase */}
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

                    {/* Progress */}
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                {t('goalDetail.progress')}
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

                    {/* Statistics */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                    }}>
                        {/* Days to goal */}
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
                                    {t('goalDetail.daysLeft')}:
                                </Typography>
                                <Typography variant="h5" fontWeight={700} sx={{ color: daysRemaining > 0 ? '#6C6FF9' : '#FFB3BA' }}>
                                    {daysRemaining > 0 ? daysRemaining : 0}
                                </Typography>
                            </Box>
                        )}

                        {/* Remaining */}
                        <Box sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            background: mode === 'dark' 
                                ? 'rgba(108, 111, 249, 0.1)' 
                                : 'rgba(199, 206, 234, 0.2)',
                            border: `1px solid ${mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : '#C7CEEA'}`,
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            alignItems: { xs: 'center', sm: 'flex-start' },
                            justifyContent: { xs: 'space-between', sm: 'flex-start' },
                            gap: { xs: 1, sm: 0.5 }
                        }}>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                            >
                                {t('goalDetail.remaining')}:
                            </Typography>
                            <Typography 
                                variant="h5" 
                                fontWeight={700} 
                                sx={{ 
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    fontSize: { xs: '1rem', sm: '1.5rem' }
                                }}
                            >
                                {remaining.toLocaleString()} {currency}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Recommendation */}
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
                                    {t('goalDetail.recommendedDaily')}
                                </Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                    {dailyRecommendation.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency} {t('goalDetail.perDay')}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Description */}
                    {goal.description && (
                        <Box>
                            <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}>
                                {t('goalDetail.description')}
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E', mt: 0.5 }}>
                                {goal.description}
                            </Typography>
                        </Box>
                    )}

                    {/* Fund Management */}
                    <Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                            {t('goalDetail.fundManagement')}
                        </Typography>
                        <Stack spacing={2}>
                            <NumberInput
                                value={amount}
                                onChange={setAmount}
                                label={t('goalDetail.amount')}
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
                                    {t('goalDetail.add')}
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
                                    {t('goalDetail.withdraw')}
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};