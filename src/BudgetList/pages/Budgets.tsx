import React, {useMemo, useState} from 'react';
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
        <Container maxWidth="md" sx={{py: {xs: 2, sm: 4}, px: {xs: 1, sm: 2}}}>
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
                     background: mode === 'dark'
                         ? 'rgba(101, 70, 51, 0.5)'
                         : 'rgba(234, 234, 244, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
                        fontWeight: 'bold',
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(101, 70, 51, 0.7)'
                                : 'rgba(234, 234, 244, 0.7)',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 6px 20px rgba(101, 70, 51, 0.4)'
                                : '0 6px 20px rgba(234, 234, 244, 0.4)',
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