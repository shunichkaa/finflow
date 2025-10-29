import React, {useMemo, useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../Budgets/store/useFinanceStore';
import {BudgetForm} from '../../components/features/budget/BudgetForm.tsx';
import {Modal} from '../../components/ui/Modal';
import {useThemeMode} from '../../Budgets/theme/ThemeContext';

const Budgets: React.FC = () => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const budgets = useFinanceStore((state) => state.budgets);

    const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
    const editingBudget = useMemo(() => budgets.find(b => b.id === editingBudgetId) || null, [budgets, editingBudgetId]);

    // Функция для получения фона как в аналитике

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: {xs: 0.5, sm: 1},
                px: {xs: 0.5, sm: 1, md: 1.5},
                transition: (theme) => theme.transitions.create(['padding', 'transform'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.complex,
                }),
            }}
        >
            <Box sx={{mb: 4}}>
                <Typography
                    variant="h4"
                    gutterBottom
                    fontWeight="700"
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        mb: 1
                    }}
                >
                    {t('budgets')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.6)',
                        mb: 3
                    }}
                >
                    {t('budgetsDescription')}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => setIsModalOpen(true)}
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
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 32px rgba(108, 111, 249, 0.5)'
                                : '0 12px 32px rgba(168, 163, 246, 0.5)',
                        }
                    }}
                >
                    {t('createBudget')}
                </Button>
            </Box>

            <Modal open={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setEditingBudgetId(null);
            }} title={editingBudget ? t('editBudget') : t('createBudget')}>
                <BudgetForm initialBudget={editingBudget ?? undefined} onSuccess={() => {
                    setIsModalOpen(false);
                    setEditingBudgetId(null);
                }}/>
            </Modal>
        </Container>
    );
};

export default Budgets;