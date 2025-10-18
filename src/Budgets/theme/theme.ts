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
            main: 'rgba(101, 70, 51, 0.5)', // Яркий коричневый с прозрачностью
            light: 'rgba(234, 234, 244, 0.3)', // Нежный фиолетовый с прозрачностью
            dark: 'rgba(255, 185, 141, 0.6)', // Нежный оранжевый с прозрачностью
            contrastText: '#FCF9F9', // Спокойный белый для текста
        },
        secondary: {
            main: 'rgba(255, 185, 141, 0.5)', // Нежный оранжевый с прозрачностью
            light: 'rgba(254, 222, 233, 0.3)', // Светлый розовый с прозрачностью
            dark: 'rgba(101, 70, 51, 0.6)', // Яркий коричневый с прозрачностью
            contrastText: '#FCF9F9', // Спокойный белый для текста
        },
        error: {
            main: 'rgba(255, 185, 141, 0.8)', // Нежный оранжевый для ошибок
            light: 'rgba(255, 185, 141, 0.6)',
            dark: 'rgba(101, 70, 51, 0.8)',
            contrastText: '#FCF9F9',
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
            contrastText: '#FCF9F9',
        },
        info: {
            main: 'rgba(234, 234, 244, 0.8)', // Нежный фиолетовый для информации
            light: 'rgba(234, 234, 244, 0.6)',
            dark: 'rgba(101, 70, 51, 0.8)',
            contrastText: '#654633',
        },
        background: {
            default: 'rgba(101, 70, 51, 0.3)', // Яркий коричневый с большей прозрачностью
            paper: 'rgba(248, 229, 229, 0.2)', // Светлый бежевый с большей прозрачностью
        },
        text: {
            primary: '#FCF9F9', // Спокойный белый для основного текста
            secondary: 'rgba(252, 249, 249, 0.7)', // Спокойный белый с прозрачностью для вторичного текста
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