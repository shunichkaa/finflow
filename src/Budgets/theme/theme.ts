import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: 'rgba(234, 234, 244, 0.5)', // Нежный фиолетовый с прозрачностью
            light: 'rgba(252, 249, 249, 0.3)', // Спокойный белый с прозрачностью
            dark: 'rgba(101, 70, 51, 0.6)', // Яркий коричневый с прозрачностью
            contrastText: '#654633', // Яркий коричневый для текста
        },
        secondary: {
            main: 'rgba(248, 229, 229, 0.5)', // Светлый бежевый с прозрачностью
            light: 'rgba(254, 222, 233, 0.3)', // Светлый розовый с прозрачностью
            dark: 'rgba(255, 185, 141, 0.6)', // Нежный оранжевый с прозрачностью
            contrastText: '#654633', // Яркий коричневый для текста
        },
        error: {
            main: 'rgba(255, 185, 141, 0.8)', // Нежный оранжевый для ошибок
            light: 'rgba(255, 185, 141, 0.6)',
            dark: 'rgba(101, 70, 51, 0.8)',
            contrastText: '#654633',
        },
        success: {
            main: 'rgba(254, 222, 233, 0.8)', // Светлый розовый для успеха
            light: 'rgba(254, 222, 233, 0.6)',
            dark: 'rgba(248, 229, 229, 0.8)',
            contrastText: '#654633',
        },
        warning: {
            main: 'rgba(255, 185, 141, 0.8)', // Нежный оранжевый для предупреждений
            light: 'rgba(255, 185, 141, 0.6)',
            dark: 'rgba(101, 70, 51, 0.8)',
            contrastText: '#654633',
        },
        info: {
            main: 'rgba(234, 234, 244, 0.8)', // Нежный фиолетовый для информации
            light: 'rgba(234, 234, 244, 0.6)',
            dark: 'rgba(101, 70, 51, 0.8)',
            contrastText: '#654633',
        },
        background: {
            default: 'rgba(252, 249, 249, 0.3)', // Спокойный белый с большей прозрачностью
            paper: 'rgba(248, 229, 229, 0.2)', // Светлый бежевый с большей прозрачностью
        },
        text: {
            primary: '#654633', // Яркий коричневый для основного текста
            secondary: 'rgba(101, 70, 51, 0.7)', // Яркий коричневый с прозрачностью для вторичного текста
        },
        divider: 'rgba(101, 70, 51, 0.2)' // Яркий коричневый с прозрачностью для разделителей
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
            main: 'rgba(60, 55, 50, 0.8)', // Темный коричнево-серый
            light: 'rgba(80, 75, 70, 0.6)', // Средний коричнево-серый
            dark: 'rgba(40, 35, 30, 0.9)', // Очень темный коричнево-серый
            contrastText: '#F5F5DC', // Бежевый для текста
        },
        secondary: {
            main: 'rgba(80, 75, 70, 0.7)', // Средний коричнево-серый
            light: 'rgba(100, 95, 90, 0.5)', // Светлый коричнево-серый
            dark: 'rgba(60, 55, 50, 0.8)', // Темный коричнево-серый
            contrastText: '#F5F5DC', // Бежевый для текста
        },
        error: {
            main: 'rgba(220, 100, 100, 0.8)', // Холодный красный для ошибок
            light: 'rgba(220, 100, 100, 0.6)',
            dark: 'rgba(180, 60, 60, 0.8)',
            contrastText: '#E8F4F8',
        },
        success: {
            main: 'rgba(100, 200, 150, 0.8)', // Холодный зеленый для успеха
            light: 'rgba(100, 200, 150, 0.6)',
            dark: 'rgba(60, 160, 100, 0.8)',
            contrastText: '#1A3A2A',
        },
        warning: {
            main: 'rgba(200, 180, 100, 0.8)', // Холодный желтый для предупреждений
            light: 'rgba(200, 180, 100, 0.6)',
            dark: 'rgba(160, 140, 80, 0.8)',
            contrastText: '#E8F4F8',
        },
        info: {
            main: 'rgba(100, 150, 200, 0.8)', // Холодный синий для информации
            light: 'rgba(100, 150, 200, 0.6)',
            dark: 'rgba(60, 100, 160, 0.8)',
            contrastText: '#E8F4F8',
        },
        background: {
            default: 'rgba(40, 35, 30, 0.98)', // Темный коричнево-серый фон
            paper: 'rgba(60, 55, 50, 0.4)', // Темный коричнево-серый для карточек
        },
        text: {
            primary: '#F5F5DC', // Бежевый для основного текста
            secondary: 'rgba(245, 245, 220, 0.8)', // Бежевый с прозрачностью для вторичного текста
        },
        divider: 'rgba(139, 69, 19, 0.3)' // Темный шоколадный для разделителей
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