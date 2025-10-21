import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#977DFF', // Лавандовый из градиента
            light: '#B8A6FF', // Светлый лавандовый
            dark: '#7B5EE6', // Темный лавандовый
            contrastText: '#FFFFFF', // Белый для контраста
        },
        secondary: {
            main: '#FFCCF2', // Розовый из градиента
            light: '#FFDDF6', // Светлый розовый
            dark: '#FFB3ED', // Темный розовый
            contrastText: '#0600AB', // Темно-синий для контраста
        },
        error: {
            main: '#FF6B6B', // Красный
            light: '#FF8E8E',
            dark: '#E55555',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#96CEB4', // Зеленый
            light: '#B0D9C4',
            dark: '#7CB89A',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFEAA7', // Желтый
            light: '#FFF0C7',
            dark: '#F5E087',
            contrastText: '#0600AB',
        },
        info: {
            main: '#0033FF', // Ярко-синий из градиента
            light: '#4D6FFF',
            dark: '#0028CC',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F2E6EE', // Светло-розовый из градиента
            paper: 'rgba(255, 255, 255, 0.3)', // Полупрозрачный белый для glassmorphism
        },
        text: {
            primary: '#0600AB', // Темно-синий из градиента
            secondary: 'rgba(6, 0, 171, 0.7)', // Темно-синий с прозрачностью
        },
        divider: 'rgba(151, 125, 255, 0.2)' // Лавандовый с прозрачностью
    },
    typography: {
        fontFamily: [
            'SF Pro Display',
            'Proxima Nova',
            'Montserrat',
            'Poppins',
            'Inter',
            'system-ui',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            letterSpacing: '-0.01em',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.02em',
        }
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '14px 28px',
                    borderRadius: 20,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px rgba(6, 0, 171, 0.25), 0 2px 8px rgba(6, 0, 171, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        transition: 'left 0.5s',
                    },
                    '&:hover': {
                        transform: 'translateY(-4px) scale(1.05)',
                        boxShadow: '0 16px 48px rgba(6, 0, 171, 0.4), 0 4px 16px rgba(6, 0, 171, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        '&::before': {
                            left: '100%',
                        },
                    },
                    '&:active': {
                        transform: 'translateY(-2px) scale(1.02)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(40px) saturate(180%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: 24,
                    boxShadow: '0 8px 32px rgba(6, 0, 171, 0.37), 0 2px 8px rgba(6, 0, 171, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    },
                    '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 60px rgba(6, 0, 171, 0.4), 0 8px 20px rgba(6, 0, 171, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                    backgroundColor: '#ffffff',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#977DFF',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#977DFF',
                            borderWidth: 2,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#0600AB',
                        '&.Mui-focused': {
                            color: '#0600AB',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(151, 125, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(151, 125, 255, 0.6)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#977DFF',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: '#0600AB',
                        '&.Mui-focused': {
                            color: '#0600AB',
                        },
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(151, 125, 255, 0.3)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(151, 125, 255, 0.2)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#0600AB',
                    '&:hover': {
                        backgroundColor: 'rgba(151, 125, 255, 0.1)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(151, 125, 255, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(151, 125, 255, 0.3)',
                        },
                    },
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(151, 125, 255, 0.3)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(151, 125, 255, 0.2)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(151, 125, 255, 0.3)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(151, 125, 255, 0.2)',
                },
            },
        },
    },
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#0033FF', // Ярко-синий из градиента
            light: '#4D6FFF', // Светлый синий
            dark: '#0028CC', // Темный синий
            contrastText: '#FFFFFF', // Белый для контраста
        },
        secondary: {
            main: '#977DFF', // Лавандовый из градиента
            light: '#B8A6FF', // Светлый лавандовый
            dark: '#7B5EE6', // Темный лавандовый
            contrastText: '#FFFFFF', // Белый для контраста
        },
        error: {
            main: '#FF6B6B', // Красный
            light: '#FF8E8E',
            dark: '#E55555',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#96CEB4', // Зеленый
            light: '#B0D9C4',
            dark: '#7CB89A',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFEAA7', // Желтый
            light: '#FFF0C7',
            dark: '#F5E087',
            contrastText: '#00003D',
        },
        info: {
            main: '#977DFF', // Лавандовый из градиента
            light: '#B8A6FF',
            dark: '#7B5EE6',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#00003D', // Темно-синий из градиента
            paper: 'rgba(6, 0, 61, 0.85)', // Полупрозрачный темно-синий для glassmorphism
        },
        text: {
            primary: '#FFFFFF', // Белый для основного текста
            secondary: 'rgba(255, 255, 255, 0.8)', // Белый с прозрачностью
        },
        divider: 'rgba(151, 125, 255, 0.2)' // Лавандовый с прозрачностью
    },
    typography: {
        fontFamily: [
            'SF Pro Display',
            'Proxima Nova',
            'Montserrat',
            'Poppins',
            'Inter',
            'system-ui',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            letterSpacing: '-0.01em',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.02em',
        }
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '14px 28px',
                    borderRadius: 20,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        transition: 'left 0.5s',
                    },
                    '&:hover': {
                        transform: 'translateY(-4px) scale(1.05)',
                        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        '&::before': {
                            left: '100%',
                        },
                    },
                    '&:active': {
                        transform: 'translateY(-2px) scale(1.02)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(40px) saturate(180%)',
                    backgroundColor: 'rgba(26, 0, 77, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: 24,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    },
                    '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 8px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(26, 0, 77, 0.35)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                    backgroundColor: '#1e293b',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backgroundColor: 'rgba(0, 51, 255, 0.1)',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#977DFF',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#977DFF',
                            borderWidth: 2,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#FFFFFF',
                        '&.Mui-focused': {
                            color: '#977DFF',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(151, 125, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(151, 125, 255, 0.6)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#977DFF',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: '#FFFFFF',
                        '&.Mui-focused': {
                            color: '#977DFF',
                        },
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(6, 0, 107, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(151, 125, 255, 0.3)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 51, 255, 0.4)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: 'rgba(151, 125, 255, 0.2)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(151, 125, 255, 0.3)',
                        '&:hover': {
                            backgroundColor: 'rgba(151, 125, 255, 0.4)',
                        },
                    },
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(6, 0, 107, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(151, 125, 255, 0.3)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 51, 255, 0.4)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(6, 0, 107, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(151, 125, 255, 0.3)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 51, 255, 0.4)',
                },
            },
        },
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);