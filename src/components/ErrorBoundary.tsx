import React, { Component, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, errorInfo, resetError }) => {
    const navigate = useNavigate();
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
                    backgroundColor: 'rgba(252, 249, 249, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                }}
            >
                {/* Иконка ошибки */}
                <Box
                    sx={{
                        fontSize: '4rem',
                        mb: 2,
                        color: 'rgba(255, 185, 141, 0.8)',
                    }}
                >
                    ⚠️
                </Box>

                <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
                    Что-то пошло не так
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Произошла неожиданная ошибка. Мы уже работаем над её исправлением.
                </Typography>

                {/* Детали ошибки в режиме разработки */}
                {process.env.NODE_ENV === 'development' && error && (
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            backgroundColor: 'rgba(254, 222, 233, 0.1)',
                            border: '1px solid rgba(255, 185, 141, 0.3)',
                            borderRadius: 2,
                            textAlign: 'left',
                        }}
                    >
                        <Typography variant="subtitle2" color="error" gutterBottom>
                            Детали ошибки:
                        </Typography>
                        <Typography
                            variant="body2"
                            component="pre"
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                color: 'rgba(101, 70, 51, 0.8)',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                            {error.toString()}
                        </Typography>
                        {errorInfo && (
                            <Typography
                                variant="body2"
                                component="pre"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    color: 'rgba(101, 70, 51, 0.8)',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    mt: 1,
                                }}
                            >
                                {errorInfo.componentStack}
                            </Typography>
                        )}
                    </Box>
                )}

                {/* Кнопки действий */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        onClick={handleGoHome}
                        sx={{
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
                        Вернуться на главную
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleReload}
                        sx={{
                            borderColor: 'rgba(101, 70, 51, 0.3)',
                            color: 'rgba(101, 70, 51, 0.7)',
                            '&:hover': {
                                borderColor: 'rgba(101, 70, 51, 0.5)',
                                backgroundColor: 'rgba(101, 70, 51, 0.04)',
                            },
                        }}
                    >
                        Перезагрузить страницу
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
            error,
            errorInfo,
        });

        // Отправка ошибки в сервис мониторинга (если есть)
        if (process.env.NODE_ENV === 'production') {
            // Здесь можно добавить отправку в Sentry, LogRocket и т.д.
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

// Хук для использования ErrorBoundary в функциональных компонентах
export const useErrorHandler = () => {
    return (error: Error, errorInfo?: React.ErrorInfo) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);
        
        // Можно добавить дополнительную логику обработки ошибок
        if (process.env.NODE_ENV === 'production') {
            // Отправка в сервис мониторинга
        }
    };
};

export default ErrorBoundary;
