import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

// Neumorphic Design System - Sofia Pro Font + Modern Soft UI
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#6C6FF9', // Cornflower Blue
            light: '#6B92E5',
            dark: '#272B3E', // Midnight Blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#7B81BE', // Purple-Blue
            light: '#64C7F8', // Maya Blue
            dark: '#272B3E',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#F88ABO', // Pink (repurposed as error for neumorphic style)
            light: '#FFB3D0',
            dark: '#E65A8A',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#6BC5A4', // Mint
            light: '#8FD9C0',
            dark: '#4FA887',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#F88ABO', // Pink
            light: '#FFB3D0',
            dark: '#E65A8A',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#64C7F8', // Maya Blue
            light: '#8DD7FA',
            dark: '#3FA8E0',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F6FA', // Main background (из Style Guide)
            paper: '#FFFFFF', // Crystal White for cards
        },
        text: {
            primary: '#272B3E', // Midnight Blue (из Style Guide)
            secondary: '#8F9BB3', // Secondary text (из Style Guide)
            disabled: '#C5CEE0', // Disabled text
        },
        divider: 'rgba(143, 155, 179, 0.2)',
    },
    typography: {
        fontFamily: [
            'Sofia Pro',
            'Inter',
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
            fontWeight: 700, // Bold
            fontSize: '28px', // Увеличено с 24px
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: '#272B3E',
        },
        h2: {
            fontWeight: 600, // Medium (увеличено)
            fontSize: '22px', // Увеличено с 18px
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
            color: '#272B3E',
        },
        h3: {
            fontWeight: 600, // Увеличено
            fontSize: '18px', // Увеличено с 14px
            letterSpacing: '0em',
            lineHeight: 1.5,
            color: '#272B3E',
        },
        h4: {
            fontWeight: 500, // Увеличено
            fontSize: '16px', // Увеличено с 12px
            letterSpacing: '0em',
            lineHeight: 1.5,
            color: '#272B3E',
        },
        h5: {
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0em',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 500,
            fontSize: '13px', // Увеличено с 12px
            letterSpacing: '0em',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '16px', // Увеличено с 14px
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '0em',
        },
        body2: {
            fontSize: '14px', // Увеличено с 12px
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0em',
        },
        button: {
            fontWeight: 500,
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
                    background: '#F5F6FA', // Правильный фон из Style Guide
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                },
                '@import': "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap')",
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24, // 20-24px
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    background: '#FFFFFF', // Белый фон кнопок
                    border: 'none',
                    color: '#272B3E',
                    // Top Layer (raised)
                    boxShadow: '-10px -10px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '-12px -12px 24px rgba(255, 255, 255, 0.9), 12px 12px 24px rgba(174, 174, 192, 0.5)',
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        // Pressed state
                        boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.5), inset 5px 5px 10px rgba(174, 174, 192, 0.5)',
                        transform: 'translateY(0)',
                    },
                },
                contained: {
                    background: 'linear-gradient(145deg, #7B81FF, #6C6FF9)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '12px 12px 20px rgba(108, 111, 249, 0.4), -2px -2px 10px rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                        background: 'linear-gradient(145deg, #8A8DFF, #7C7FFF)',
                        boxShadow: '14px 14px 24px rgba(108, 111, 249, 0.5), -2px -2px 12px rgba(255, 255, 255, 0.3)',
                    },
                    '&:active': {
                        boxShadow: 'inset -6px -6px 12px rgba(123, 129, 255, 0.3), inset 6px 6px 12px rgba(108, 111, 249, 0.5)',
                    },
                },
                outlined: {
                    background: '#ECF0F3',
                    border: '2px solid #6C6FF9',
                    color: '#6C6FF9',
                    boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.7), 8px 8px 16px rgba(166, 180, 200, 0.3)',
                    '&:hover': {
                        boxShadow: '-10px -10px 18px rgba(255, 255, 255, 0.8), 10px 10px 18px rgba(166, 180, 200, 0.4)',
                    },
                    '&:active': {
                        boxShadow: 'inset -6px -6px 12px rgba(255, 255, 255, 0.5), inset 6px 6px 12px rgba(166, 180, 200, 0.5)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 32, // 24-32px для карточек
                    background: '#FFFFFF', // Белый фон карточек из Style Guide
                    border: 'none',
                    padding: '24px',
                    // Raised element shadow
                    boxShadow: '-15px -15px 30px rgba(255, 255, 255, 0.8), 15px 15px 30px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '-18px -18px 36px rgba(255, 255, 255, 0.9), 18px 18px 36px rgba(174, 174, 192, 0.5)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 32,
                    background: '#FFFFFF', // Белый фон
                    border: 'none',
                    boxShadow: '-10px -10px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                },
                elevation1: {
                    boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.8), 8px 8px 16px rgba(174, 174, 192, 0.3)',
                },
                elevation2: {
                    boxShadow: '-10px -10px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)',
                },
                elevation3: {
                    boxShadow: '-15px -15px 30px rgba(255, 255, 255, 0.8), 15px 15px 30px rgba(174, 174, 192, 0.4)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF', // Белый фон AppBar
                    borderBottom: 'none',
                    boxShadow: '0 2px 16px rgba(174, 174, 192, 0.15)',
                    color: '#272B3E',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#FFFFFF', // Белый фон Drawer
                    borderRight: 'none',
                    boxShadow: '15px 0 30px rgba(174, 174, 192, 0.15)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 20, // 16-20px для inputs
                        background: '#FFFFFF', // Белый фон
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                            border: 'none', // NO BORDERS!
                        },
                        // Inset shadow для input
                        boxShadow: 'inset -3px -3px 8px rgba(255, 255, 255, 0.5), inset 3px 3px 8px rgba(174, 174, 192, 0.5)',
                        '&:hover': {
                            boxShadow: 'inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(174, 174, 192, 0.6)',
                        },
                        '&.Mui-focused': {
                            boxShadow: 'inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(174, 174, 192, 0.6), 0 0 0 3px rgba(108, 111, 249, 0.15)',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#272B3E',
                        '&::placeholder': {
                            color: '#8F9BB3',
                            opacity: 1,
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    background: '#FFFFFF',
                    boxShadow: 'inset -3px -3px 8px rgba(255, 255, 255, 0.5), inset 3px 3px 8px rgba(174, 174, 192, 0.5)',
                    '& fieldset': {
                        border: 'none',
                    },
                    '&:hover': {
                        boxShadow: 'inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(174, 174, 192, 0.6)',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                    background: '#FFFFFF',
                    border: 'none',
                    boxShadow: '-12px -12px 24px rgba(255, 255, 255, 0.8), 12px 12px 24px rgba(174, 174, 192, 0.4)',
                    marginTop: '8px',
                    padding: '8px',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    margin: '4px 0',
                    padding: '10px 16px',
                    transition: 'all 0.3s ease',
                    background: 'transparent',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#F5F6FA',
                        boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.3)',
                    },
                    '&.Mui-selected': {
                        background: '#F5F6FA',
                        color: '#6C6FF9',
                        boxShadow: 'inset -3px -3px 6px rgba(255, 255, 255, 0.5), inset 3px 3px 6px rgba(174, 174, 192, 0.5)',
                        '&:hover': {
                            boxShadow: 'inset -4px -4px 8px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(174, 174, 192, 0.5)',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 24,
                    background: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 20px 60px rgba(174, 174, 192, 0.3)',
                    padding: '32px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    background: '#ECF0F3',
                    border: 'none',
                    color: '#6C6FF9',
                    fontWeight: 500,
                    padding: '8px 16px',
                    boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '-4px -4px 8px rgba(255, 255, 255, 0.8), 4px 4px 8px rgba(174, 174, 192, 0.4)',
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 12,
                    borderRadius: 12,
                    background: '#ECF0F3',
                    // Inset shadow для прогресс-бара
                    boxShadow: 'inset -3px -3px 8px rgba(255, 255, 255, 0.5), inset 3px 3px 8px rgba(174, 174, 192, 0.5)',
                },
                bar: {
                    borderRadius: 12,
                    // Gradient для data visualization
                    background: 'linear-gradient(90deg, #6B92E5, #6C6FF9)',
                    boxShadow: '-2px -2px 6px rgba(255, 255, 255, 0.3), 2px 2px 6px rgba(108, 111, 249, 0.4)',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 56,
                    height: 32,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 4,
                        '&.Mui-checked': {
                            transform: 'translateX(24px)',
                            '& .MuiSwitch-thumb': {
                                background: '#FFFFFF',
                                boxShadow: '-4px -4px 8px rgba(255, 255, 255, 0.8), 4px 4px 8px rgba(174, 174, 192, 0.5)',
                            },
                            '& + .MuiSwitch-track': {
                                backgroundColor: '#6C6FF9', // Active state = colored
                                boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 0.3), inset 2px 2px 6px rgba(0, 0, 0, 0.2)',
                                opacity: 1,
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        width: 24,
                        height: 24,
                        background: '#FFFFFF',
                        boxShadow: '-4px -4px 8px rgba(255, 255, 255, 0.8), 4px 4px 8px rgba(174, 174, 192, 0.5)',
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 32,
                        backgroundColor: '#ECF0F3',
                        boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 0.5), inset 2px 2px 6px rgba(174, 174, 192, 0.5)',
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    width: 48,
                    height: 48,
                    borderRadius: 16, // Icon buttons квадратные с скруглением
                    background: '#ECF0F3',
                    color: '#272B3E',
                    boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.8), 8px 8px 16px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '-10px -10px 20px rgba(255, 255, 255, 0.9), 10px 10px 20px rgba(174, 174, 192, 0.5)',
                    },
                    '&:active': {
                        boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.5), inset 5px 5px 10px rgba(174, 174, 192, 0.5)',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 12,
                    background: '#ECF0F3',
                    color: '#4A5568',
                    fontSize: '0.875rem',
                    padding: '12px 16px',
                    boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5)',
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    background: '#ECF0F3',
                    borderRadius: 10,
                    padding: 10,
                    boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.9), 8px 8px 16px rgba(174, 174, 192, 0.5)',
                    },
                    '&.Mui-checked': {
                        background: '#ECF0F3',
                        boxShadow: 'inset -4px -4px 8px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(174, 174, 192, 0.5)',
                        color: '#6C6FF9',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    background: '#ECF0F3',
                    borderRadius: '50%',
                    padding: 10,
                    boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.9), 8px 8px 16px rgba(174, 174, 192, 0.5)',
                    },
                    '&.Mui-checked': {
                        background: '#ECF0F3',
                        boxShadow: 'inset -4px -4px 8px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(174, 174, 192, 0.5)',
                        color: '#6C6FF9',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    background: '#ECF0F3',
                    borderRadius: 20,
                    padding: 8,
                    // Inset для контейнера tabs
                    boxShadow: 'inset -3px -3px 8px rgba(255, 255, 255, 0.5), inset 3px 3px 8px rgba(174, 174, 192, 0.5)',
                },
                indicator: {
                    display: 'none', // Используем shadows вместо indicator
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    margin: '0 6px',
                    padding: '12px 24px',
                    textTransform: 'none',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    background: 'transparent',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#ECF0F3',
                        boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.3)',
                    },
                    '&.Mui-selected': {
                        background: '#ECF0F3',
                        color: '#6C6FF9',
                        // Raised для активной вкладки
                        boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.8), 8px 8px 16px rgba(174, 174, 192, 0.4)',
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    height: 8,
                    color: '#6C6FF9',
                },
                rail: {
                    height: 8,
                    borderRadius: 8,
                    background: '#ECF0F3',
                    boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 0.5), inset 2px 2px 6px rgba(174, 174, 192, 0.5)',
                    opacity: 1,
                },
                track: {
                    height: 8,
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #6B92E5, #6C6FF9)',
                    boxShadow: '-2px -2px 4px rgba(255, 255, 255, 0.3), 2px 2px 4px rgba(108, 111, 249, 0.4)',
                    border: 'none',
                },
                thumb: {
                    width: 24,
                    height: 24,
                    background: '#ECF0F3',
                    boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    '&:hover': {
                        boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.9), 8px 8px 16px rgba(174, 174, 192, 0.5)',
                    },
                    '&.Mui-active': {
                        boxShadow: 'inset -3px -3px 6px rgba(255, 255, 255, 0.5), inset 3px 3px 6px rgba(174, 174, 192, 0.5)',
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: '#ECF0F3',
                    boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5)',
                    marginBottom: 16,
                    '&:before': {
                        display: 'none',
                    },
                    '&.Mui-expanded': {
                        margin: '0 0 16px 0',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    padding: '16px 24px',
                    '&:hover': {
                        background: 'transparent',
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '16px 24px',
                    background: '#ECF0F3',
                    borderRadius: '0 0 16px 16px',
                    boxShadow: 'inset 0 4px 8px rgba(163, 177, 198, 0.3)',
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    borderRadius: 12,
                    padding: '6px 10px',
                    background: 'linear-gradient(145deg, #7B81FF, #6C6FF9)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '12px',
                    boxShadow: '4px 4px 8px rgba(108, 111, 249, 0.4), -2px -2px 6px rgba(255, 255, 255, 0.3)',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    background: '#ECF0F3',
                    borderRadius: 20,
                    padding: 12,
                    boxShadow: 'inset -3px -3px 8px rgba(255, 255, 255, 0.5), inset 3px 3px 8px rgba(174, 174, 192, 0.5)',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    margin: '6px 0',
                    padding: '12px 16px',
                    background: 'transparent',
                    transition: 'all 0.3s ease',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#ECF0F3',
                        boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    margin: '6px 0',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease',
                    color: '#272B3E',
                    '&:hover': {
                        background: '#ECF0F3',
                        boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    },
                    '&.Mui-selected': {
                        background: '#ECF0F3',
                        color: '#6C6FF9',
                        boxShadow: 'inset -3px -3px 6px rgba(255, 255, 255, 0.5), inset 3px 3px 6px rgba(174, 174, 192, 0.5)',
                        '&:hover': {
                            boxShadow: 'inset -4px -4px 8px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(174, 174, 192, 0.5)',
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'transparent',
                    height: 2,
                    background: 'linear-gradient(90deg, transparent, rgba(174, 174, 192, 0.3) 50%, transparent)',
                    boxShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    background: '#ECF0F3',
                    color: '#6C6FF9',
                    fontWeight: 600,
                    boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.8), 8px 8px 16px rgba(174, 174, 192, 0.4)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',
                    padding: '16px',
                    color: '#272B3E',
                },
                head: {
                    fontWeight: 600,
                    background: '#ECF0F3',
                    color: '#272B3E',
                    boxShadow: 'inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(174, 174, 192, 0.3)',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    background: '#ECF0F3',
                    border: 'none',
                    boxShadow: '-10px -10px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)',
                    padding: '16px 20px',
                },
                standardSuccess: {
                    background: '#ECF0F3',
                    color: '#6BC5A4', // Mint
                    '& .MuiAlert-icon': {
                        color: '#6BC5A4',
                    },
                },
                standardError: {
                    background: '#ECF0F3',
                    color: '#F88ABO', // Pink
                    '& .MuiAlert-icon': {
                        color: '#F88ABO',
                    },
                },
                standardWarning: {
                    background: '#ECF0F3',
                    color: '#F88ABO', // Pink
                    '& .MuiAlert-icon': {
                        color: '#F88ABO',
                    },
                },
                standardInfo: {
                    background: '#ECF0F3',
                    color: '#64C7F8', // Maya Blue
                    '& .MuiAlert-icon': {
                        color: '#64C7F8',
                    },
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(145deg, #7B81FF, #6C6FF9)',
                    color: '#FFFFFF',
                    boxShadow: '12px 12px 24px rgba(108, 111, 249, 0.4), -2px -2px 10px rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: 'linear-gradient(145deg, #8A8DFF, #7C7FFF)',
                        boxShadow: '14px 14px 28px rgba(108, 111, 249, 0.5), -2px -2px 12px rgba(255, 255, 255, 0.4)',
                        transform: 'translateY(-4px)',
                    },
                    '&:active': {
                        boxShadow: 'inset -6px -6px 12px rgba(123, 129, 255, 0.3), inset 6px 6px 12px rgba(108, 111, 249, 0.5)',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    background: '#ECF0F3',
                    borderTop: 'none',
                    boxShadow: '0 -10px 20px rgba(174, 174, 192, 0.4), 0 2px 10px rgba(255, 255, 255, 0.8)',
                },
            },
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    color: '#272B3E',
                    borderRadius: 14,
                    margin: '8px 6px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: '#ECF0F3',
                        boxShadow: '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(174, 174, 192, 0.4)',
                    },
                    '&.Mui-selected': {
                        color: '#6C6FF9',
                        background: '#ECF0F3',
                        boxShadow: 'inset -3px -3px 6px rgba(255, 255, 255, 0.5), inset 3px 3px 6px rgba(174, 174, 192, 0.5)',
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
                        color: '#8F9BB3', // Secondary text color
                        opacity: 1,
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
