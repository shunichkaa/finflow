import React from 'react';
import {useMemo, useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../Budgets/store/useFinanceStore';
import {BudgetList} from '../../components/features/budget/BudgetList.tsx';
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
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
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
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 32px rgba(99, 102, 241, 0.5)'
                                : '0 12px 32px rgba(168, 163, 246, 0.5)',
                        }
                    }}
                >
                    {t('createBudget')}
                </Button>
            </Box>


            {/* Budget List */}
            <Box sx={{width: '100%'}}>
                <BudgetList onEdit={(id) => {
                    setEditingBudgetId(id);
                    setIsModalOpen(true);
                }}/>
            </Box>

            {/* Modal */}
            <Modal open={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setEditingBudgetId(null);
            }} title={editingBudget ? t('editBudget') : t('createBudget')}>
                <Box sx={{width: {xs: '100%', sm: 520}}}>
                    <BudgetForm initialBudget={editingBudget ?? undefined} onSuccess={() => {
                        setIsModalOpen(false);
                        setEditingBudgetId(null);
                    }}/>
                </Box>
            </Modal>
        </Container>
    );
};

export default Budgets;