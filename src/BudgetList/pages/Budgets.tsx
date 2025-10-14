import React, {useMemo, useState} from 'react';
import {Box, Button, Container, Paper, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../Budgets/store/useFinanceStore';
import {calculateBudgetSpent, getBudgetStatus} from '../../Budgets/utils/budgetCalculations';
import {BudgetList} from '../../components/features/BudgetList';
import {BudgetForm} from '../../components/features/BudgetForm';
import {Modal} from '../../components/ui/Modal';

const Budgets: React.FC = () => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const budgets = useFinanceStore((state) => state.budgets);
    const transactions = useFinanceStore((state) => state.transactions);

    const totalBudgets = budgets.length;
    const exceededBudgets = budgets.filter((b) => {
        const spent = calculateBudgetSpent(b, transactions);
        const status = getBudgetStatus((spent / b.limit) * 100);
        return status === 'exceeded';
    }).length;

    const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
    const editingBudget = useMemo(() => budgets.find(b => b.id === editingBudgetId) || null, [budgets, editingBudgetId]);

    return (
        <Container maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Header */}
            <Box sx={{mb: 4}}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    {t('budgets')}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {t('budgetsDescription')}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{mt: 2}}
                >
                    {t('createBudget')}
                </Button>
            </Box>

            {/* Quick Stats */}
            {budgets.length > 0 && (
                <Box sx={{display: 'flex', gap: 2, mb: 4, flexDirection: {xs: 'column', sm: 'row'}}}>
                    <Box sx={{flex: 1}}>
                        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h6">{t('totalBudgets')}</Typography>
                            <Typography variant="h3" fontWeight="bold">{totalBudgets}</Typography>
                        </Paper>
                    </Box>
                    <Box sx={{flex: 1}}>
                        <Paper
                            sx={{ p: 3, bgcolor: exceededBudgets > 0 ? 'error.main' : 'success.main', color: 'white', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h6" fontWeight="bold">{t('exceededBudgets')}: {exceededBudgets}</Typography>
                        </Paper>
                    </Box>
                </Box>
            )}

            {/* Budget List */}
            <Box sx={{ width: '100%', maxWidth: 720 }}>
                <BudgetList onEdit={(id) => { setEditingBudgetId(id); setIsModalOpen(true); }}/>
            </Box>

            {/* Modal */}
            <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingBudgetId(null); }} title={editingBudget ? t('editBudget') : t('createBudget')}>
                <Box sx={{ width: { xs: '100%', sm: 520 } }}>
                    <BudgetForm initialBudget={editingBudget ?? undefined} onSuccess={() => { setIsModalOpen(false); setEditingBudgetId(null); }}/>
                </Box>
            </Modal>
        </Container>
    );
};

export default Budgets;