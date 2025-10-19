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
            <Box sx={{mb: 4, textAlign: 'left'}}>
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: mode === 'dark' ? '#FCF9F9' : '#654633' }}>
                    {t('budgets')}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)' }}>
                    {t('budgetsDescription')}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{
                        mt: 2,
                        backdropFilter: 'blur(20px) saturate(180%)',
                        background: mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)'
                            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.2)' 
                            : '1px solid rgba(255, 255, 255, 0.3)',
                        color: mode === 'dark' ? '#FFFFFF' : '#4A5568',
                        fontWeight: 'bold',
                        borderRadius: 3,
                        boxShadow: mode === 'dark' 
                            ? '0 8px 32px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : '0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.3) 100%)'
                                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)',
                            transform: 'translateY(-4px) scale(1.02)',
                            boxShadow: mode === 'dark' 
                                ? '0 16px 48px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                : '0 16px 48px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
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