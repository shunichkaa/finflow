import { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TransactionForm } from './components/features/TransactionForm';
import { Modal } from './components/ui/Modal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                    💰 FinFlow
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                >
                    Добавить транзакцию
                </Button>
            </Box>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Новая транзакция"
            >
                <TransactionForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </Container>
    );
}

export default App;