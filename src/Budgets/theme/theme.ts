import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#A8A3F6', // LILAC - светлый фиолетовый
            light: '#C4C0F8', // Светлый лиловый
            dark: '#8B85E8', // Темный лиловый
            contrastText: '#FFFFFF', // Белый для контраста
        },
        secondary: {
            main: '#F6D5EE', // PINK - нежный розовый
            light: '#F8E5F2', // Светлый розовый
            dark: '#F2C5E6', // Темный розовый
            contrastText: '#243168', // NAVY для контраста
        },
        error: {
            main: '#FF6B6B', // Красный из UI-кита
            light: '#FF8E8E',
            dark: '#E55555',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#96CEB4', // Зеленый из UI-кита
            light: '#B0D9C4',
            dark: '#7CB89A',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFEAA7', // Желтый из UI-кита
            light: '#FFF0C7',
            dark: '#F5E087',
            contrastText: '#243168',
        },
        info: {
            main: '#4ECDC4', // Бирюзовый из UI-кита
            light: '#6ED5CE',
            dark: '#3EB5AE',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F5F5', // Светло-серый фон
            paper: 'rgba(255, 255, 255, 0.25)', // Полупрозрачный белый для glassmorphism
        },
        text: {
            primary: '#243168', // NAVY для основного текста
            secondary: 'rgba(36, 49, 104, 0.7)', // NAVY с прозрачностью
        },
        divider: 'rgba(36, 49, 104, 0.15)' // NAVY с прозрачностью
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
                    boxShadow: '0 8px 32px rgba(36, 49, 104, 0.25), 0 2px 8px rgba(36, 49, 104, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
                        boxShadow: '0 16px 48px rgba(36, 49, 104, 0.4), 0 4px 16px rgba(36, 49, 104, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
                    boxShadow: '0 8px 32px rgba(36, 49, 104, 0.37), 0 2px 8px rgba(36, 49, 104, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
                        boxShadow: '0 20px 60px rgba(36, 49, 104, 0.4), 0 8px 20px rgba(36, 49, 104, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
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
                        backgroundColor: '#ffffff',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0ea5e9',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0ea5e9',
                            borderWidth: 2,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#654633',
                        '&.Mui-focused': {
                            color: '#654633',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(101, 70, 51, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(101, 70, 51, 0.6)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(101, 70, 51, 0.8)',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: '#654633',
                        '&.Mui-focused': {
                            color: '#654633',
                        },
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(101, 70, 51, 0.2)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(101, 70, 51, 0.15)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#654633',
                    '&:hover': {
                        backgroundColor: 'rgba(101, 70, 51, 0.1)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(101, 70, 51, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(101, 70, 51, 0.3)',
                        },
                    },
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(101, 70, 51, 0.2)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(101, 70, 51, 0.15)',
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
                    backgroundColor: '#ffffff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(101, 70, 51, 0.2)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(101, 70, 51, 0.15)',
                },
            },
        },
    },
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#6366F1', // Мягкий индиго
            light: '#818CF8', // Светлый индиго
            dark: '#4F46E5', // Темный индиго
            contrastText: '#FFFFFF', // Белый для контраста
        },
        secondary: {
            main: '#8B5CF6', // Мягкий фиолетовый
            light: '#A78BFA', // Светлый фиолетовый
            dark: '#7C3AED', // Темный фиолетовый
            contrastText: '#FFFFFF', // Белый для контраста
        },
        error: {
            main: '#FF6B6B', // Красный из UI-кита
            light: '#FF8E8E',
            dark: '#E55555',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#96CEB4', // Зеленый из UI-кита
            light: '#B0D9C4',
            dark: '#7CB89A',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFEAA7', // Желтый из UI-кита
            light: '#FFF0C7',
            dark: '#F5E087',
            contrastText: '#1A004D',
        },
        info: {
            main: '#4ECDC4', // Бирюзовый из UI-кита
            light: '#6ED5CE',
            dark: '#3EB5AE',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#0F0F23', // Мягкий темно-синий фон
            paper: 'rgba(15, 15, 35, 0.85)', // Полупрозрачный темно-синий для glassmorphism
        },
        text: {
            primary: '#FFFFFF', // Белый для основного текста
            secondary: 'rgba(255, 255, 255, 0.8)', // Белый с прозрачностью
        },
        divider: 'rgba(255, 255, 255, 0.15)' // Белый с прозрачностью
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
                        backgroundColor: '#1e293b',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0ea5e9',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0ea5e9',
                            borderWidth: 2,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#F5F5DC',
                        '&.Mui-focused': {
                            color: '#F5F5DC',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(245, 245, 220, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(245, 245, 220, 0.6)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(245, 245, 220, 0.8)',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: '#F5F5DC',
                        '&.Mui-focused': {
                            color: '#F5F5DC',
                        },
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1a1a1a',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245, 245, 220, 0.2)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#F5F5DC',
                    '&:hover': {
                        backgroundColor: 'rgba(245, 245, 220, 0.1)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(245, 245, 220, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(245, 245, 220, 0.3)',
                        },
                    },
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1a1a1a',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245, 245, 220, 0.2)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
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
                    backgroundColor: '#1a1a1a',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245, 245, 220, 0.2)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                },
            },
        },
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);