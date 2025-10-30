import { Component, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../Budgets/theme/ThemeContext';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorFallbackProps {
    error: Error | null;
    errorInfo?: React.ErrorInfo | null;
    resetError?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ resetError }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {mode} = useThemeMode();

    const handleGoHome = () => {
        if (resetError) {
            resetError();
        }
        navigate('/dashboard');
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: mode === 'dark' ? '#FFFFFF0D' : '#FFFFFF40',
                    border: mode === 'dark' ? '1px solid #FFFFFF1A' : '1px solid #94A3B81A',
                }}
            >
                {}
                <Box
                    sx={{
                        fontSize: '4rem',
                        mb: 2,
                        color: '#FFB98DCC',
                    }}
                >
                    ⚠️
                </Box>

                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    {t('errorBoundary.title', 'Ой, что-то не так, уже исправляем...')}
                </Typography>

                {}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        onClick={handleGoHome}
                        sx={{
                        background: mode === 'dark' 
                            ? '#6C6FF9CC'
                            : '#A8A3F6CC',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: mode === 'dark' 
                                    ? '#6C6FF9FF'
                                    : '#A8A3F6FF',
                                transform: 'translateY(-2px)',
                                boxShadow: mode === 'dark' 
                                    ? '0 6px 20px #6C6FF966'
                                    : '0 6px 20px #A8A3F666',
                            }
                        }}
                    >
                        {t('errorBoundary.goHome', 'Вернуться на главную')}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleReload}
                        sx={{
                            borderColor: mode === 'dark' ? '#FFFFFF4D' : '#0600AB4D',
                            color: mode === 'dark' ? '#FFFFFFB3' : '#0600ABB3',
                            '&:hover': {
                                borderColor: mode === 'dark' ? '#FFFFFF80' : '#0600AB80',
                                backgroundColor: mode === 'dark' ? '#FFFFFF0A' : '#0600AB0A',
                            },
                        }}
                    >
                        {t('errorBoundary.reload', 'Перезагрузить страницу')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

                this.setState({
            error: error,
            errorInfo: errorInfo,
        });

        if (process.env.NODE_ENV === 'production') {
            console.error('Production error:', {
                error: error.toString(),
                errorInfo: errorInfo.componentStack,
                timestamp: new Date().toISOString(),
            });
        }
    }

    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    resetError={this.resetError}
                />
            );
        }

        return this.props.children;
    }
}

export const useErrorHandler = () => {
    return (error: Error, errorInfo?: React.ErrorInfo) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);

                if (process.env.NODE_ENV === 'production') {
        }
    };
};

export default ErrorBoundary;