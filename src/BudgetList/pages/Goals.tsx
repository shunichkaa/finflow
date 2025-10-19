import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { Goal } from '../../Budgets/types';
import { GoalsList } from '../../components/features/goals/GoalsList';
import { GoalForm } from '../../components/features/goals/GoalForm';
import { Modal } from '../../components/ui/Modal';

console.log('Goals component loaded');

const Goals: React.FC = () => {
    console.log('Goals component rendering');
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

    const handleAddGoal = () => {
        setEditingGoal(null);
        setIsModalOpen(true);
    };

    const handleEditGoal = (goal: Goal) => {
        setEditingGoal(goal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingGoal(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                    color: mode === 'dark' ? '#FCF9F9' : '#654633'
                }}>
                    🎯 {t('goals', 'Цели')}
                </Typography>
                <Typography variant="body1" sx={{
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)',
                    mb: 3
                }}>
                    {t('goalsDescription', 'Ставьте финансовые цели и отслеживайте прогресс их достижения')}
                </Typography>

                {/* Кнопка добавления */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddGoal}
                        size="large"
                        sx={{
                            backgroundColor: mode === 'dark' 
                                ? 'rgba(100, 200, 150, 0.8)'
                                : 'rgba(254, 222, 233, 0.8)',
                            color: mode === 'dark' ? '#1A3A2A' : '#654633',
                            fontWeight: '600',
                            fontSize: '16px',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            boxShadow: mode === 'dark' 
                                ? '0 8px 25px rgba(100, 200, 150, 0.3)'
                                : '0 8px 25px rgba(254, 222, 233, 0.4)',
                            border: 'none',
                            '&:hover': {
                                backgroundColor: mode === 'dark' 
                                    ? 'rgba(100, 200, 150, 0.9)'
                                    : 'rgba(254, 222, 233, 0.9)',
                                transform: 'translateY(-3px)',
                                boxShadow: mode === 'dark' 
                                    ? '0 12px 35px rgba(100, 200, 150, 0.4)'
                                    : '0 12px 35px rgba(254, 222, 233, 0.5)',
                            },
                            '&:active': {
                                transform: 'translateY(-1px)',
                            },
                            '& .MuiButton-startIcon': {
                                marginRight: 1,
                                '& svg': {
                                    fontSize: '20px'
                                }
                            }
                        }}
                    >
                        {t('createGoal', 'Создать цель')}
                    </Button>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ px: {xs: 1, sm: 2}, pb: 4 }}>
                {/* Goals List */}
                <Paper sx={{ 
                    p: 2, 
                    backgroundColor: mode === 'dark' ? 'rgba(101, 70, 51, 0.8)' : 'rgba(234, 234, 244, 0.8)',
                    color: mode === 'dark' ? '#FCF9F9' : '#654633'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        px: 1
                    }}>
                        <Typography variant="h6" sx={{ 
                            color: mode === 'dark' ? '#FCF9F9' : '#654633',
                            fontWeight: 'bold'
                        }}>
                            {t('myGoals', 'Мои цели')}
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={handleAddGoal}
                            sx={{
                                borderColor: mode === 'dark' 
                                    ? 'rgba(100, 200, 150, 0.5)' 
                                    : 'rgba(254, 222, 233, 0.5)',
                                color: mode === 'dark' 
                                    ? 'rgba(100, 200, 150, 0.8)' 
                                    : 'rgba(254, 222, 233, 0.8)',
                                fontWeight: '500',
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 2,
                                py: 0.5,
                                '&:hover': {
                                    borderColor: mode === 'dark' 
                                        ? 'rgba(100, 200, 150, 0.8)' 
                                        : 'rgba(254, 222, 233, 0.8)',
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(100, 200, 150, 0.1)' 
                                        : 'rgba(254, 222, 233, 0.1)',
                                    transform: 'translateY(-1px)',
                                },
                                '& .MuiButton-startIcon': {
                                    marginRight: 0.5,
                                    '& svg': {
                                        fontSize: '16px'
                                    }
                                }
                            }}
                        >
                            {t('createGoal', 'Создать цель')}
                        </Button>
                    </Box>
                    <GoalsList onEditGoal={handleEditGoal} onAddGoal={handleAddGoal} />
                </Paper>
            </Container>

            {/* Add/Edit Goal Modal */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                title={editingGoal ? t('editGoal', 'Редактировать цель') : t('createGoal', 'Создать цель')}
            >
                <GoalForm
                    initialGoal={editingGoal || undefined}
                    onSuccess={handleCloseModal}
                />
            </Modal>
        </Container>
    );
};

export default Goals;
