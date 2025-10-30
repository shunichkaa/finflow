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


export const GoalDetail: React.FC<GoalDetailProps> = ({ goal, open, onClose, onEdit }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const { currency } = useSettingsStore();
    const { addToGoal, goals } = useGoalsStore();

        const [amount, setAmount] = useState('');

    if (!goal) return null;

    const actualGoal = goals.find(g => g.id === goal.id) || goal;

    const progress = (actualGoal.currentAmount / actualGoal.targetAmount) * 100;
    const remaining = actualGoal.targetAmount - actualGoal.currentAmount;

    const daysRemaining = actualGoal.targetDate 
        ? Math.ceil((new Date(actualGoal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

    const dailyRecommendation = daysRemaining && daysRemaining > 0
        ? remaining / daysRemaining
        : 0;

    const handleAddFunds = () => {
        const amountNum = parseFloat(amount);
        if (amountNum > 0) {
            addToGoal(actualGoal.id, amountNum);
            setAmount('');
        }
    };

    const handleWithdraw = () => {
        const amountNum = parseFloat(amount);
        if (amountNum > 0 && amountNum <= actualGoal.currentAmount) {
            addToGoal(actualGoal.id, -amountNum);
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
                    {actualGoal.name}
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
                                    backgroundColor: mode === 'dark' ? '#6C6FF91A' : '#6C6FF91A',
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
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#FFFFFFB3' : '#272B3EB3' }}>
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
                                bgcolor: mode === 'dark' ? '#FFFFFF1A' : '#EFF0F6',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: '#6C6FF9',
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="h6" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                {actualGoal.currentAmount.toLocaleString()} {currency}
                            </Typography>
                            <Typography variant="h6" sx={{ color: mode === 'dark' ? '#FFFFFF80' : '#272B3E80' }}>
                                {actualGoal.targetAmount.toLocaleString()} {currency}
                            </Typography>
                        </Box>
                    </Box>

                        {daysRemaining !== null && (
                            <Box sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: 2,
                                background: mode === 'dark' 
                                    ? '#6C6FF91A' 
                                    : '#C7CEEA33',
                                border: `1px solid ${mode === 'dark' ? '#6C6FF94D' : '#C7CEEA'}`,
                            }}>
                                <Typography variant="caption" sx={{ color: mode === 'dark' ? '#FFFFFFB3' : '#272B3EB3' }}>
                                    {t('goalDetail.daysLeft')}:
                                </Typography>
                                <Typography variant="h5" fontWeight={700} sx={{ color: daysRemaining > 0 ? '#6C6FF9' : '#FFB3BA' }}>
                                    {daysRemaining > 0 ? daysRemaining : 0}
                                </Typography>
                            </Box>
                        )}

                    {dailyRecommendation > 0 && (
                        <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #B5EAD71A 0%, #B5EAD733 100%)',
                            border: '1px solid #B5EAD7',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <TrendingUpIcon sx={{ color: '#B5EAD7', fontSize: 32 }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: mode === 'dark' ? '#FFFFFFB3' : '#272B3EB3' }}>
                                    {t('goalDetail.recommendedDaily')}
                                </Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                    {dailyRecommendation.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency} {t('goalDetail.perDay')}
                                </Typography>
                            </Box>
                        </Box>
                    )}

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
                                        <Typography variant="body2" sx={{ color: mode === 'dark' ? '#FFFFFF99' : '#272B3E99' }}>
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
                                            boxShadow: '0 4px 12px #6C6FF966',
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
                                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > actualGoal.currentAmount}
                                    sx={{
                                        borderColor: '#6C6FF9',
                                        color: '#6C6FF9',
                                        '&:hover': {
                                            borderColor: '#6C6FF9',
                                            background: '#6C6FF90D',
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