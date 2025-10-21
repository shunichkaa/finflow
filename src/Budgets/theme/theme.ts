import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

// iOS 26 Liquid Glass Theme with Custom Gradient Colors
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#977DFF', // Лавандовый из градиента
            light: '#B8A6FF',
            dark: '#7B5EE6',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFCCF2', // Розовый из градиента
            light: '#FFDDF6',
            dark: '#FFB3ED',
            contrastText: '#0600AB',
        },
        error: {
            main: '#FF3B30', // iOS Red
            light: '#FF6961',
            dark: '#D70015',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#34C759', // iOS Green
            light: '#62D77C',
            dark: '#248A3D',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FF9500', // iOS Orange
            light: '#FFAB40',
            dark: '#C66900',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#8B5CF6', // Мягкий фиолетовый
            light: '#A78BFA',
            dark: '#7C3AED',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F2E6EE', // Светло-розовый из градиента
            paper: 'rgba(252, 248, 245, 0.7)', // Milky Glass
        },
        text: {
            primary: '#0600AB', // Темно-синий из градиента
            secondary: 'rgba(6, 0, 171, 0.7)',
            disabled: '#8e8e93',
        },
        divider: 'rgba(151, 125, 255, 0.2)',
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
                },
                'html, body, #root': {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                },
                body: {
                    background: 'linear-gradient(135deg, #F2E6EE 0%, #FFCCF2 50%, #977DFF 100%)',
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
                    background: 'rgba(252, 248, 245, 0.7)',
                    border: '1px solid rgba(252, 248, 245, 0.9)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(31, 38, 135, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                        background: 'rgba(252, 248, 245, 0.85)',
                    },
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #977DFF 0%, #8B5CF6 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(151, 125, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #7B5EE6 0%, #0028CC 100%)',
                        boxShadow: '0 12px 40px rgba(151, 125, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(151, 125, 255, 0.3)',
                    color: '#977DFF',
                    background: 'rgba(151, 125, 255, 0.05)',
                    backdropFilter: 'blur(40px)',
                    '&:hover': {
                        borderColor: '#977DFF',
                        background: 'rgba(151, 125, 255, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(252, 248, 245, 0.7)',
                    border: '1px solid rgba(252, 248, 245, 0.9)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 60px rgba(31, 38, 135, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(252, 248, 245, 0.7)',
                    border: '1px solid rgba(252, 248, 245, 0.9)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                elevation1: {
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                elevation2: {
                    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.18), 0 4px 12px rgba(0, 0, 0, 0.12)',
                },
                elevation3: {
                    boxShadow: '0 16px 48px rgba(31, 38, 135, 0.2), 0 6px 16px rgba(0, 0, 0, 0.15)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(252, 248, 245, 0.85)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
                    color: '#0600AB',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backdropFilter: 'blur(40px) saturate(180%)',
                    background: 'rgba(252, 248, 245, 0.85)',
                    borderRight: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backdropFilter: 'blur(20px)',
                        background: 'rgba(252, 248, 245, 0.6)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: 'rgba(252, 248, 245, 0.75)',
                            border: '1px solid rgba(151, 125, 255, 0.2)',
                        },
                        '&.Mui-focused': {
                            background: 'rgba(252, 248, 245, 0.85)',
                            border: '1px solid #977DFF',
                            boxShadow: '0 4px 16px rgba(151, 125, 255, 0.15)',
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
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
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
                    background: 'rgba(252, 248, 245, 0.85)',
                    border: '1px solid rgba(252, 248, 245, 0.9)',
                    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)',
                    marginTop: '8px',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(151, 125, 255, 0.08)',
                    },
                    '&.Mui-selected': {
                        background: 'rgba(151, 125, 255, 0.12)',
                        '&:hover': {
                            background: 'rgba(151, 125, 255, 0.16)',
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
                    background: 'rgba(252, 248, 245, 0.85)',
                    border: '1px solid rgba(252, 248, 245, 0.9)',
                    boxShadow: '0 20px 60px rgba(31, 38, 135, 0.25), 0 8px 20px rgba(0, 0, 0, 0.2)',
                    padding: '8px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(252, 248, 245, 0.6)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    fontWeight: 500,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(252, 248, 245, 0.8)',
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
                    background: 'rgba(0, 0, 0, 0.05)',
                },
                bar: {
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #977DFF 0%, #8B5CF6 100%)',
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
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 31 / 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
                        background: 'rgba(151, 125, 255, 0.08)',
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
                    background: 'rgba(6, 0, 171, 0.9)',
                    fontSize: '0.875rem',
                    padding: '8px 12px',
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
