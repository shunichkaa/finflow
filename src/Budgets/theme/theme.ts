import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

// Minimalist Design System - Sofia Pro Font + Clean Flat UI
// ТОЛЬКО 5 ЦВЕТОВ: #6C6FF9, #6C6FF9, #272B3E, #EFF0F6, #FFFFFF
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#6C6FF9', // Cornflower Blue
            light: '#6C6FF9', // Maya Blue
            dark: '#272B3E', // Midnight Blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#6C6FF9', // Maya Blue
            light: '#6C6FF9',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#6C6FF9', // Используем основной цвет
            light: '#6C6FF9',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#6C6FF9', // Maya Blue
            light: '#6C6FF9',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#6C6FF9', // Cornflower Blue
            light: '#6C6FF9',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#6C6FF9', // Maya Blue
            light: '#6C6FF9',
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F6FA', // Светлый фон
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
            styleOverrides: `
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                }
                
                html, body, #root {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                }
                
                body {
                    background: #EFF0F6;
                    background-attachment: fixed;
                    min-height: 100vh;
                    margin: 0;
                    padding: 0;
                }
                
                /* Убираем стрелочки в number inputs */
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `,
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
                        color: '#6C6FF9',
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
                        color: '#6C6FF9',
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

// Dark Theme - Минималистичная палитра
const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#6C6FF9', // Maya Blue - основной акцент в темной теме
            light: '#6C6FF9',
            dark: '#6C6FF9',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#6C6FF9', // Cornflower Blue
            light: '#6C6FF9',
            dark: '#6C6FF9',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#FFB3BA', // Пастельный красный
            light: '#FFB3BA',
            dark: '#FFB3BA',
            contrastText: '#272B3E',
        },
        success: {
            main: '#B5EAD7', // Пастельный зеленый
            light: '#B5EAD7',
            dark: '#B5EAD7',
            contrastText: '#272B3E',
        },
        warning: {
            main: '#FFD7BA', // Пастельный оранжевый
            light: '#FFD7BA',
            dark: '#FFD7BA',
            contrastText: '#272B3E',
        },
        info: {
            main: '#6C6FF9', // Maya Blue
            light: '#6C6FF9',
            dark: '#6C6FF9',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#272B3E', // Midnight Blue - единый темный фон
            paper: '#272B3E', // Тот же цвет для карточек
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
            disabled: 'rgba(255, 255, 255, 0.5)',
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
                    background: 'rgba(108, 111, 249, 0.4)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: 'rgba(108, 111, 249, 0.6)',
                    },
                },
                    body: {
                        background: 'linear-gradient(135deg, #272B3E 0%, #272B3E 50%, #272B3E 100%)',
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
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    },
                },
                contained: {
                    background: '#6C6FF9',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(100, 199, 248, 0.3)',
                    '&:hover': {
                        background: '#6C6FF9',
                        boxShadow: '0 4px 12px rgba(100, 199, 248, 0.4)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                elevation1: {
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                },
                elevation2: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                },
                elevation3: {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#272B3E',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    color: '#FFFFFF',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#272B3E',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#FFFFFF',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(100, 199, 248, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6C6FF9',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(100, 199, 248, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6C6FF9',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 8,
                    background: '#272B3E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    margin: '2px 0',
                    color: '#FFFFFF',
                    background: 'transparent',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&.Mui-selected': {
                        background: 'rgba(100, 199, 248, 0.15)',
                        '&:hover': {
                            background: 'rgba(100, 199, 248, 0.2)',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    background: '#272B3E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    boxShadow: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(100, 199, 248, 0.2)',
                        color: '#6C6FF9',
                        transform: 'translateY(-2px)',
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
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                bar: {
                    borderRadius: 8,
                    background: '#6C6FF9',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'none',
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
                                backgroundColor: '#6C6FF9',
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
                        background: 'rgba(108, 111, 249, 0.15)',
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
