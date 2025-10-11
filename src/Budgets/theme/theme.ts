import { createTheme } from '@mui/material/styles';

// Кастомная цветовая палитра для финансового приложения
export const theme = createTheme({
    palette: {
        primary: {
            main: '#2563eb', // Синий
            light: '#3b82f6',
            dark: '#1e40af',
        },
        secondary: {
            main: '#10b981', // Зелёный для доходов
            light: '#34d399',
            dark: '#059669',
        },
        error: {
            main: '#ef4444', // Красный для расходов
            light: '#f87171',
            dark: '#dc2626',
        },
        success: {
            main: '#22c55e',
        },
        warning: {
            main: '#f59e0b',
        },
        background: {
            default: '#f9fafb',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12, // Более округлые углы
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Убираем КАПС
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                },
            },
        },
    },
});