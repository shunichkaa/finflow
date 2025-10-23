import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

// Minimalist Design System - Sofia Pro Font + Clean Flat UI
// ТОЛЬКО 5 ЦВЕТОВ: #6C6FF9, #64C7F8, #272B3E, #EFF0F6, #FFFFFF
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#6C6FF9', // Cornflower Blue
            light: '#64C7F8', // Maya Blue
            dark: '#272B3E', // Midnight Blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#64C7F8', // Maya Blue
            light: '#64C7F8',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#6C6FF9', // Используем основной цвет
            light: '#64C7F8',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#64C7F8', // Maya Blue
            light: '#64C7F8',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#6C6FF9', // Cornflower Blue
            light: '#64C7F8',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#64C7F8', // Maya Blue
            light: '#64C7F8',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#EFF0F6', // Athens Gray - главный фон
            paper: '#FFFFFF', // Crystal White - карточки
        },
        text: {
            primary: '#272B3E', // Midnight Blue
            secondary: '#272B3E', // Midnight Blue (используем тот же)
            disabled: '#EFF0F6', // Athens Gray
        },
        divider: 'rgba(39, 43, 62, 0.1)',
    },
    typography: {
        fontFamily: [
            'Nunito',
            'Rounded',
            'Sofia Pro',
            'Inter',
            '-apple-system',
            'SF Pro Rounded',
            'SF Pro Display',
            'system-ui',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '32px', // Увеличено для округлого шрифта
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: '#272B3E',
        },
        h2: {
            fontWeight: 600,
            fontSize: '26px', // Увеличено
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
            color: '#272B3E',
        },
        h3: {
            fontWeight: 600,
            fontSize: '20px', // Увеличено
            letterSpacing: '0em',
            lineHeight: 1.5,
            color: '#272B3E',
        },
        h4: {
            fontWeight: 500,
            fontSize: '18px', // Увеличено
            letterSpacing: '0em',
            lineHeight: 1.5,
            color: '#272B3E',
        },
        h5: {
            fontWeight: 500,
            fontSize: '16px', // Увеличено
            letterSpacing: '0em',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 500,
            fontSize: '15px', // Увеличено
            letterSpacing: '0em',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '17px', // Увеличено для лучшей читаемости
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '0em',
        },
        body2: {
            fontSize: '15px', // Увеличено
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0em',
        },
        button: {
            fontWeight: 500,
            fontSize: '16px', // Увеличено
            letterSpacing: '0em',
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    margin: 0,
                    padding: 0,
                },
                'html, body, #root': {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                },
                body: {
                    background: '#EFF0F6', // Athens Gray - минимализм
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                },
                '@import': "url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap')",
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    background: '#FFFFFF',
                    border: 'none',
                    color: '#272B3E',
                    boxShadow: '0 1px 3px rgba(39, 43, 62, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(39, 43, 62, 0.12)',
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: '0 1px 3px rgba(39, 43, 62, 0.1)',
                    },
                },
                contained: {
                    background: '#6C6FF9',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(108, 111, 249, 0.2)',
                    '&:hover': {
                        background: '#6C6FF9',
                        boxShadow: '0 4px 12px rgba(108, 111, 249, 0.3)',
                    },
                    '&:active': {
                        boxShadow: '0 1px 4px rgba(108, 111, 249, 0.2)',
                    },
                },
                outlined: {
                    background: '#FFFFFF',
                    border: '1px solid #6C6FF9',
                    color: '#6C6FF9',
                    boxShadow: 'none',
                    '&:hover': {
                        background: '#EFF0F6',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        background: '#EFF0F6',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: '#FFFFFF',
                    border: 'none',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(39, 43, 62, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(39, 43, 62, 0.12)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(39, 43, 62, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                elevation1: {
                    boxShadow: '0 1px 4px rgba(39, 43, 62, 0.06)',
                },
                elevation2: {
                    boxShadow: '0 2px 8px rgba(39, 43, 62, 0.08)',
                },
                elevation3: {
                    boxShadow: '0 4px 12px rgba(39, 43, 62, 0.12)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    borderBottom: 'none',
                    boxShadow: '0 2px 8px rgba(39, 43, 62, 0.08)',
                    color: '#272B3E',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#FFFFFF',
                    borderRight: 'none',
                    boxShadow: '2px 0 8px rgba(39, 43, 62, 0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        background: '#FFFFFF',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& fieldset': {
                            border: '1px solid #EFF0F6',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        },
                        '&:hover fieldset': {
                            border: '1px solid #6C6FF9',
                        },
                        '&.Mui-focused fieldset': {
                            border: '2px solid #6C6FF9',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#272B3E',
                        '&::placeholder': {
                            color: '#272B3E',
                            opacity: 0.5,
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    background: '#FFFFFF',
                    '& fieldset': {
                        border: '1px solid #EFF0F6',
                    },
                    '&:hover fieldset': {
                        border: '1px solid #6C6FF9',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 8,
                    background: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(39, 43, 62, 0.12)',
                    marginTop: '8px',
                    padding: '8px',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    margin: '2px 0',
                    padding: '10px 16px',
                    transition: 'all 0.2s ease',
                    background: 'transparent',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#EFF0F6',
                    },
                    '&.Mui-selected': {
                        background: '#EFF0F6',
                        color: '#6C6FF9',
                        '&:hover': {
                            background: '#EFF0F6',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    background: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(39, 43, 62, 0.15)',
                    padding: '32px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: '#EFF0F6',
                    border: 'none',
                    color: '#6C6FF9',
                    fontWeight: 500,
                    padding: '8px 16px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: '#6C6FF9',
                        color: '#FFFFFF',
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 8,
                    borderRadius: 8,
                    background: '#EFF0F6',
                    boxShadow: 'none',
                },
                bar: {
                    borderRadius: 8,
                    background: '#6C6FF9', // Плоский цвет
                    boxShadow: 'none',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 48,
                    height: 26,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 3,
                        '&.Mui-checked': {
                            transform: 'translateX(22px)',
                            '& .MuiSwitch-thumb': {
                                background: '#FFFFFF',
                            },
                            '& + .MuiSwitch-track': {
                                backgroundColor: '#6C6FF9',
                                opacity: 1,
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        width: 20,
                        height: 20,
                        background: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(39, 43, 62, 0.2)',
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 13,
                        backgroundColor: '#EFF0F6',
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'transparent',
                    color: '#272B3E',
                    boxShadow: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: '#EFF0F6',
                        transform: 'scale(1.05)',
                    },
                    '&:active': {
                        background: '#EFF0F6',
                        transform: 'scale(0.95)',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 6,
                    background: '#272B3E',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    padding: '8px 12px',
                    boxShadow: '0 2px 8px rgba(39, 43, 62, 0.2)',
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#272B3E',
                    '&.Mui-checked': {
                        color: '#6C6FF9',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#272B3E',
                    '&.Mui-checked': {
                        color: '#6C6FF9',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    borderRadius: 0,
                    padding: 0,
                    boxShadow: 'none',
                    borderBottom: '1px solid #EFF0F6',
                },
                indicator: {
                    backgroundColor: '#6C6FF9',
                    height: 3,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    margin: 0,
                    padding: '12px 24px',
                    textTransform: 'none',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    background: 'transparent',
                    color: '#272B3E',
                    minHeight: 48,
                    '&:hover': {
                        background: '#EFF0F6',
                    },
                    '&.Mui-selected': {
                        color: '#6C6FF9',
                        background: 'transparent',
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    height: 4,
                    color: '#6C6FF9',
                },
                rail: {
                    height: 4,
                    borderRadius: 4,
                    background: '#EFF0F6',
                    opacity: 1,
                },
                track: {
                    height: 4,
                    borderRadius: 4,
                    background: '#6C6FF9',
                    border: 'none',
                },
                thumb: {
                    width: 16,
                    height: 16,
                    background: '#6C6FF9',
                    boxShadow: '0 2px 4px rgba(39, 43, 62, 0.2)',
                    '&:hover': {
                        boxShadow: '0 3px 6px rgba(39, 43, 62, 0.3)',
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(39, 43, 62, 0.08)',
                    marginBottom: 12,
                    '&:before': {
                        display: 'none',
                    },
                    '&.Mui-expanded': {
                        margin: '0 0 12px 0',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '16px 24px',
                    '&:hover': {
                        background: '#EFF0F6',
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '16px 24px',
                    background: '#FFFFFF',
                    borderRadius: '0 0 12px 12px',
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    borderRadius: 10,
                    padding: '4px 8px',
                    background: '#6C6FF9',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '11px',
                    boxShadow: 'none',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    borderRadius: 12,
                    padding: 8,
                    boxShadow: 'none',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '2px 0',
                    padding: '12px 16px',
                    background: 'transparent',
                    transition: 'all 0.2s ease',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#EFF0F6',
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '2px 0',
                    padding: '12px 16px',
                    transition: 'all 0.2s ease',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#EFF0F6',
                    },
                    '&.Mui-selected': {
                        background: '#EFF0F6',
                        color: '#6C6FF9',
                        '&:hover': {
                            background: '#EFF0F6',
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: '#EFF0F6',
                    height: 1,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    background: '#6C6FF9',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    boxShadow: 'none',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #EFF0F6',
                    padding: '16px',
                    color: '#272B3E',
                },
                head: {
                    fontWeight: 600,
                    background: '#EFF0F6',
                    color: '#272B3E',
                    borderBottom: '2px solid #6C6FF9',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    background: '#EFF0F6',
                    border: 'none',
                    boxShadow: 'none',
                    padding: '12px 16px',
                },
                standardSuccess: {
                    background: '#EFF0F6',
                    color: '#272B3E',
                    '& .MuiAlert-icon': {
                        color: '#64C7F8',
                    },
                },
                standardError: {
                    background: '#EFF0F6',
                    color: '#272B3E',
                    '& .MuiAlert-icon': {
                        color: '#6C6FF9',
                    },
                },
                standardWarning: {
                    background: '#EFF0F6',
                    color: '#272B3E',
                    '& .MuiAlert-icon': {
                        color: '#6C6FF9',
                    },
                },
                standardInfo: {
                    background: '#EFF0F6',
                    color: '#272B3E',
                    '& .MuiAlert-icon': {
                        color: '#64C7F8',
                    },
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    background: '#6C6FF9',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(108, 111, 249, 0.3)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: '#6C6FF9',
                        boxShadow: '0 6px 16px rgba(108, 111, 249, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        boxShadow: '0 2px 8px rgba(108, 111, 249, 0.3)',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    borderTop: '1px solid #EFF0F6',
                    boxShadow: '0 -2px 8px rgba(39, 43, 62, 0.08)',
                },
            },
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    color: '#272B3E',
                    borderRadius: 8,
                    margin: '4px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: '#EFF0F6',
                    },
                    '&.Mui-selected': {
                        color: '#6C6FF9',
                        background: '#EFF0F6',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#272B3E',
                },
                input: {
                    '&::placeholder': {
                        color: '#272B3E',
                        opacity: 0.5,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#272B3E',
                    '&.Mui-focused': {
                        color: '#6C6FF9',
                    },
                },
            },
        },
    },
};

// Dark Theme with Gradient Colors
const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#8B5CF6', // Мягкий фиолетовый
            light: '#A78BFA',
            dark: '#7C3AED',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#977DFF', // Лавандовый из градиента
            light: '#B8A6FF',
            dark: '#7B5EE6',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#FF453A',
            light: '#FF7066',
            dark: '#D92419',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#30D158',
            light: '#5EE37E',
            dark: '#1FA742',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FF9F0A',
            light: '#FFB740',
            dark: '#C66900',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#977DFF',
            light: '#B8A6FF',
            dark: '#7B5EE6',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#00003D', // Темно-синий из градиента
            paper: 'rgba(6, 0, 61, 0.85)',
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.8)',
            disabled: '#8E8E93',
        },
        divider: 'rgba(255, 255, 255, 0.1)',
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'SF Pro Display',
            'SF Pro Text',
            'system-ui',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 700,
            fontSize: '1.75rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0em',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
        },
        button: {
            fontWeight: 500,
            letterSpacing: '-0.01em',
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    margin: 0,
                    padding: 0,
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                },
                'html, body, #root': {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                },
                '::-webkit-scrollbar': {
                    width: '10px',
                    height: '10px',
                },
                '::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'rgba(151, 125, 255, 0.4)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: 'rgba(151, 125, 255, 0.6)',
                    },
                },
                    body: {
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #3d3d5c 100%)',
                        backgroundAttachment: 'fixed',
                        minHeight: '100vh',
                        margin: 0,
                        padding: 0,
                    },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(28, 28, 30, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                        background: 'rgba(28, 28, 30, 0.9)',
                    },
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #977DFF 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(0, 51, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #0028CC 0%, #7B5EE6 100%)',
                        boxShadow: '0 12px 40px rgba(0, 51, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(28, 28, 30, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(28, 28, 30, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(28, 28, 30, 0.9)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.3)',
                    color: '#FFFFFF',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(28, 28, 30, 0.9)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backdropFilter: 'blur(20px)',
                        background: 'rgba(58, 58, 60, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: 'rgba(58, 58, 60, 0.75)',
                            border: '1px solid rgba(151, 125, 255, 0.3)',
                        },
                        '&.Mui-focused': {
                            background: 'rgba(58, 58, 60, 0.85)',
                            border: '1px solid #977DFF',
                            boxShadow: '0 4px 16px rgba(151, 125, 255, 0.25)',
                        },
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(58, 58, 60, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                        border: 'none',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(44, 44, 46, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    color: '#FFFFFF',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(151, 125, 255, 0.15)',
                    },
                    '&.Mui-selected': {
                        background: 'rgba(151, 125, 255, 0.25)',
                        '&:hover': {
                            background: 'rgba(151, 125, 255, 0.3)',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 28,
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(28, 28, 30, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(0, 0, 0, 0.4)',
                    padding: '8px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(58, 58, 60, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontWeight: 500,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(58, 58, 60, 0.9)',
                        transform: 'scale(1.05)',
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 8,
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.1)',
                },
                bar: {
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #8B5CF6 0%, #977DFF 100%)',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 51,
                    height: 31,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 2,
                        '&.Mui-checked': {
                            transform: 'translateX(20px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: '#977DFF',
                                opacity: 1,
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        width: 27,
                        height: 27,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 31 / 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        opacity: 1,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(151, 125, 255, 0.15)',
                        transform: 'scale(1.1)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 12,
                    backdropFilter: 'blur(40px)',
                    background: 'rgba(58, 58, 60, 0.95)',
                    fontSize: '0.875rem',
                    padding: '8px 12px',
                },
            },
        },
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
