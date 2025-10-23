import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

// Modern Professional Theme - Inspired by Finexio Style Guide
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#6E7FF3', // Cornflower Blue
            light: '#8B9AF7',
            dark: '#5566E8',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#64C7F4', // Maya Blue
            light: '#85D4F7',
            dark: '#3FB5F0',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#FF6B6B',
            light: '#FF8E8E',
            dark: '#E85555',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#51CF66',
            light: '#74DB8A',
            dark: '#3BB950',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFB946',
            light: '#FFC96B',
            dark: '#F5A623',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#64C7F4', // Maya Blue
            light: '#85D4F7',
            dark: '#3FB5F0',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FAFBFC', // Crystal White with hint
            paper: '#FFFFFF', // Pure White
        },
        text: {
            primary: '#272B3B', // Midnight Blue
            secondary: 'rgba(39, 43, 59, 0.7)',
            disabled: '#E9ECF2', // Athens Gray
        },
        divider: 'rgba(233, 236, 242, 0.8)',
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
                    background: 'linear-gradient(135deg, #FAFBFC 0%, #F5F7FA 100%)',
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
                    borderRadius: 12,
                    padding: '12px 28px',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    background: 'transparent',
                    border: '1px solid rgba(233, 236, 242, 0.6)',
                    boxShadow: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(110, 127, 243, 0.04)',
                        border: '1px solid rgba(110, 127, 243, 0.2)',
                        boxShadow: '0 2px 8px rgba(110, 127, 243, 0.08)',
                    },
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #6E7FF3 0%, #64C7F4 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(110, 127, 243, 0.25)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5566E8 0%, #3FB5F0 100%)',
                        boxShadow: '0 6px 16px rgba(110, 127, 243, 0.35)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(110, 127, 243, 0.3)',
                    color: '#6E7FF3',
                    background: 'transparent',
                    '&:hover': {
                        borderColor: '#6E7FF3',
                        background: 'rgba(110, 127, 243, 0.04)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: '#FFFFFF',
                    border: '1px solid rgba(233, 236, 242, 0.6)',
                    boxShadow: '0 2px 12px rgba(39, 43, 59, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        border: '1px solid rgba(110, 127, 243, 0.2)',
                        boxShadow: '0 4px 20px rgba(110, 127, 243, 0.08)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: '#FFFFFF',
                    border: '1px solid rgba(233, 236, 242, 0.6)',
                    boxShadow: '0 2px 12px rgba(39, 43, 59, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(39, 43, 59, 0.04)',
                },
                elevation2: {
                    boxShadow: '0 4px 16px rgba(39, 43, 59, 0.06)',
                },
                elevation3: {
                    boxShadow: '0 8px 24px rgba(39, 43, 59, 0.08)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    borderBottom: '1px solid rgba(233, 236, 242, 0.8)',
                    boxShadow: '0 2px 8px rgba(39, 43, 59, 0.04)',
                    color: '#272B3B',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#FFFFFF',
                    borderRight: '1px solid rgba(233, 236, 242, 0.8)',
                    boxShadow: '4px 0 16px rgba(39, 43, 59, 0.04)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        background: '#FAFBFC',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& fieldset': {
                            borderColor: 'rgba(233, 236, 242, 0.8)',
                            borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(110, 127, 243, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6E7FF3',
                            borderWidth: '2px',
                            boxShadow: '0 0 0 3px rgba(110, 127, 243, 0.1)',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: '#FAFAFA',
                    '& fieldset': {
                        borderColor: 'rgba(231, 229, 228, 0.3)',
                        borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(212, 212, 212, 0.4)',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    background: '#FAFAFA',
                    border: '1px solid rgba(231, 229, 228, 0.3)',
                    boxShadow: 'none',
                    marginTop: '8px',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: 'rgba(250, 250, 250, 1)',
                    },
                    '&.Mui-selected': {
                        background: 'rgba(196, 181, 253, 0.06)',
                        '&:hover': {
                            background: 'rgba(196, 181, 253, 0.1)',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    background: '#FAFAFA',
                    border: '1px solid rgba(231, 229, 228, 0.3)',
                    boxShadow: 'none',
                    padding: '16px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    background: 'rgba(250, 250, 250, 0.8)',
                    border: '1px solid rgba(231, 229, 228, 0.25)',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: 'rgba(245, 245, 244, 1)',
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 8,
                    borderRadius: 8,
                    background: 'rgba(233, 236, 242, 0.5)',
                },
                bar: {
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #6E7FF3 0%, #64C7F4 100%)',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 52,
                    height: 28,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 2,
                        '&.Mui-checked': {
                            transform: 'translateX(24px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: '#6E7FF3',
                                opacity: 1,
                                border: 'none',
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        width: 24,
                        height: 24,
                        boxShadow: 'none',
                        background: '#FFFFFF',
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 28 / 2,
                        backgroundColor: 'rgba(231, 229, 228, 0.3)',
                        opacity: 1,
                        border: '1px solid rgba(231, 229, 228, 0.3)',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: 'rgba(250, 250, 250, 0.8)',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 8,
                    background: '#272B3B',
                    fontSize: '0.875rem',
                    padding: '8px 12px',
                    boxShadow: '0 4px 12px rgba(39, 43, 59, 0.2)',
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
