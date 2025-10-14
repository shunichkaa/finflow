import React from 'react';
import {Container, Paper, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

export const Analytics: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Container maxWidth="md" sx={{py: 6}}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{fontWeight: 600, textAlign: 'center'}}
            >
                📊 {t('analytics')}
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{textAlign: 'center', mb: 6}}
            >
                {t('analyticsDescription')}
            </Typography>

            <Paper
                elevation={1}
                sx={{
                    p: 6,
                    borderRadius: 3,
                    textAlign: 'center',
                    color: 'text.secondary',
                    bgcolor: 'background.default',
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" sx={{mb: 1}}>
                    Графики появятся здесь
                </Typography>
            </Paper>
        </Container>
    );
};