import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#0ea5e9', // Яркий голубой для акцентов
            light: '#7dd3fc', // Светлый голубой
            dark: '#0284c7', // Темный голубой
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#64748b', // Нейтральный серо-голубой
            light: '#94a3b8',
            dark: '#475569',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ef4444', // Четкий красный
            light: '#fca5a5',
            dark: '#dc2626',
            contrastText: '#ffffff',
        },
        success: {
            main: '#10b981', // Четкий зеленый
            light: '#6ee7b7',
            dark: '#059669',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ECB660', // средний золотисто-желтый из палитры
            light: '#EED387', // светлый золотистый
            dark: '#AB9443', // темный коричнево-оранжевый
            contrastText: '#ffffff',
        },
        info: {
            main: '#3b82f6', // Четкий синий
            light: '#93c5fd',
            dark: '#2563eb',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc', // Очень светлый серо-голубой
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b', // Темно-серый для отличной читаемости
            secondary: '#64748b', // Средне-серый
        },
        divider: 'rgba(148, 163, 184, 0.2)'
    },
    typography: {
        fontFamily: [
            'Nunito',
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
        },
        h2: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
        }
    },
    shape: {
        borderRadius: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 18px',
                    borderRadius: 12,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    borderRadius: 16,
                    backgroundColor: '#ffffff',
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
    },
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#0ea5e9', // Яркий голубой для акцентов
            light: '#7dd3fc',
            dark: '#0284c7',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#94a3b8', // Светлый серо-голубой
            light: '#cbd5e1',
            dark: '#64748b',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ef4444', // Четкий красный
            light: '#fca5a5',
            dark: '#dc2626',
            contrastText: '#ffffff',
        },
        success: {
            main: '#10b981', // Четкий зеленый
            light: '#6ee7b7',
            dark: '#059669',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ECB660', // средний золотисто-желтый из палитры
            light: '#EED387', // светлый золотистый
            dark: '#AB9443', // темный коричнево-оранжевый
            contrastText: '#ffffff',
        },
        info: {
            main: '#3b82f6', // Четкий синий
            light: '#93c5fd',
            dark: '#2563eb',
            contrastText: '#ffffff',
        },
        background: {
            default: '#0f172a', // Очень темный сине-серый
            paper: '#1e293b', // Светлее для карточек
        },
        text: {
            primary: '#f8fafc', // Очень светлый текст
            secondary: '#cbd5e1', // Средний светлый
        },
        divider: 'rgba(148, 163, 184, 0.2)'
    },
    typography: {
        fontFamily: [
            'Nunito',
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
        },
        h2: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
        }
    },
    shape: {
        borderRadius: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 18px',
                    borderRadius: 12,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    borderRadius: 16,
                    backgroundColor: '#1e293b',
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
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);