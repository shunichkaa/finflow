import { Container, Typography, Box, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function App() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoneyIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h1" color="primary">
                        FinFlow
                    </Typography>
                </Box>

                <Typography variant="h5" color="text.secondary">
                    Умное управление финансами
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="contained" size="large">
                        Начать
                    </Button>
                    <Button variant="outlined" size="large">
                        О проекте
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default App;