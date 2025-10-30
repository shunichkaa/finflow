import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Stack,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore';
import { useGoalsStore } from '../../../Budgets/store/useGoalsStore';
import { Goal, CreateGoalInput } from '../../../Budgets/types';
import { NumberInput } from '../../ui/NumberInput.tsx';

interface GoalFormProps {
    initialGoal?: Goal;
    onSuccess: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ initialGoal, onSuccess }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const { currency } = useSettingsStore();

        const [formData, setFormData] = useState<CreateGoalInput>({
        name: initialGoal?.name || '',
        targetAmount: initialGoal?.targetAmount || 0,
        currentAmount: initialGoal?.currentAmount || 0,
        description: initialGoal?.description || '',
        targetDate: initialGoal?.targetDate || undefined,
    });

        const [errors, setErrors] = useState<Record<string, string>>({});

        const addGoal = useGoalsStore((state) => state.addGoal);
    const updateGoal = useGoalsStore((state) => state.updateGoal);

        const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

                if (!formData.name.trim()) {
            newErrors.name = t('goalNameRequired', 'Название цели обязательно');
        }

                if (formData.targetAmount <= 0) {
            newErrors.targetAmount = t('targetAmountRequired', 'Итоговая сумма должна быть больше 0');
        }

                if (formData.currentAmount < 0) {
            newErrors.currentAmount = t('currentAmountInvalid', 'Текущая сумма не может быть отрицательной');
        }

                if (formData.currentAmount > formData.targetAmount) {
            newErrors.currentAmount = t('currentAmountExceedsTarget', 'Текущая сумма не может превышать целевую');
        }

                setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

                if (!validateForm()) return;

                if (initialGoal) {
            updateGoal(initialGoal.id, formData);
        } else {
            addGoal(formData);
        }
        onSuccess();
    };

        const handleInputChange = (field: keyof CreateGoalInput, value: string | number | Date | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

        return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={3}>
                <Typography variant="h6" sx={{ 
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {initialGoal ? t('editGoal', 'Редактировать цель') : t('createGoal', 'Создать цель')}
                </Typography>

                                <TextField
                    label={t('goalName', 'Название цели')}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#504B464D' : '#F8E5E566',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? '#F5F5DCCC' : '#0600ABCC',
                        },
                    }}
                />

                                <TextField
                    label={t('description', 'Описание')}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#504B464D' : '#F8E5E566',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? '#F5F5DCCC' : '#0600ABCC',
                        },
                    }}
                />

                                <NumberInput
                    label={t('targetAmount', 'Итоговая сумма')}
                    value={String(formData.targetAmount)}
                    onChange={(value) => handleInputChange('targetAmount', parseFloat(value) || 0)}
                    fullWidth
                    error={!!errors.targetAmount}
                    helperText={errors.targetAmount}
                    allowDecimal={true}
                    InputProps={{
                        endAdornment: (
                            <Typography variant="body2" sx={{ 
                                color: mode === 'dark' ? '#FFFFFF99' : '#272B3E99' 
                            }}>
                                {currency}
                            </Typography>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#6C6FF91A' : '#C7CEEA33',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? '#FFFFFFCC' : '#272B3ECC',
                        },
                    }}
                />

                                <NumberInput
                    label={t('currentAmount', 'Текущая сумма')}
                    value={String(formData.currentAmount)}
                    onChange={(value) => handleInputChange('currentAmount', parseFloat(value) || 0)}
                    fullWidth
                    error={!!errors.currentAmount}
                    helperText={errors.currentAmount}
                    allowDecimal={true}
                    InputProps={{
                        endAdornment: (
                            <Typography variant="body2" sx={{ 
                                color: mode === 'dark' ? '#FFFFFF99' : '#272B3E99' 
                            }}>
                                {currency}
                            </Typography>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#6C6FF91A' : '#C7CEEA33',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? '#FFFFFFCC' : '#272B3ECC',
                        },
                    }}
                />

                                <TextField
                    label={t('targetDate', 'Целевая дата')}
                    type="date"
                    value={formData.targetDate ? formData.targetDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleInputChange('targetDate', e.target.value ? new Date(e.target.value) : undefined)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#504B464D' : '#F8E5E566',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? '#F5F5DCCC' : '#0600ABCC',
                        },
                    }}
                />

                                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        py: 1.5,
                        background: mode === 'dark' 
                            ? '#0600ABCC'
                            : '#EAEAF4CC',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontWeight: 'bold',
                        '&:hover': {
                            background: mode === 'dark' 
                                ? '#654633FF'
                                : '#EAEAF4FF',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 6px 20px #0600AB66'
                                : '0 6px 20px #EAEAF466',
                        }
                    }}
                >
                    {initialGoal ? t('updateGoal', 'Обновить цель') : t('createGoal', 'Создать цель')}
                </Button>
            </Stack>
        </Box>
    );
};