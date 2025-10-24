import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
                            backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(6, 0, 171, 0.8)',
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
                            backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(6, 0, 171, 0.8)',
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
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(39, 43, 62, 0.6)' 
                            }}>
                                {currency}
                            </Typography>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(199, 206, 234, 0.2)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(39, 43, 62, 0.8)',
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
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(39, 43, 62, 0.6)' 
                            }}>
                                {currency}
                            </Typography>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(199, 206, 234, 0.2)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(39, 43, 62, 0.8)',
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
                            backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(6, 0, 171, 0.8)',
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
                            ? 'rgba(6, 0, 171, 0.8)'
                            : 'rgba(234, 234, 244, 0.8)',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontWeight: 'bold',
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(101, 70, 51, 1)'
                                : 'rgba(234, 234, 244, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 6px 20px rgba(6, 0, 171, 0.4)'
                                : '0 6px 20px rgba(234, 234, 244, 0.4)',
                        }
                    }}
                >
                    {initialGoal ? t('updateGoal', 'Обновить цель') : t('createGoal', 'Создать цель')}
                </Button>
            </Stack>
        </Box>
    );
};
