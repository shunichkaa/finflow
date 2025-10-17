import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#B8D4F0', // Молочно-голубой
            light: '#E8F4FD', // Очень светлый голубой
            dark: '#7BA7D1', // Темно-голубой
            contrastText: '#2C3E50',
        },
        secondary: {
            main: '#C7E0F4', // Пастельный голубой
            light: '#F0F8FF', // Очень светлый
            dark: '#8BB8E8', // Средний голубой
            contrastText: '#2C3E50',
        },
        error: {
            main: '#F5B7B1', // Пастельный розовый
            light: '#FADBD8',
            dark: '#E8A59B',
        },
        success: {
            main: '#A9DFBF', // Пастельный зеленый
            light: '#D5F4E6',
            dark: '#7DCEA0',
        },
        warning: {
            main: '#F9E79F', // Пастельный желтый
            light: '#FCF3CF',
            dark: '#F4D03F',
        },
        info: {
            main: '#AED6F1', // Пастельный синий
            light: '#D6EAF8',
            dark: '#85C1E9',
        },
        background: {
            default: '#F8FBFF', // Очень светлый молочно-голубой
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2C3E50', // Темно-серый
            secondary: '#5D6D7E', // Средне-серый
        },
        divider: 'rgba(184,212,240,0.3)'
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
                    borderRadius: 999,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 8px 24px rgba(184, 212, 240, 0.15)',
                    border: '1px solid rgba(184, 212, 240, 0.2)',
                    borderRadius: 16,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(79,148,243,0.15)'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 8px 24px rgba(33, 150, 243, 0.05)'
                }
            }
        }
    },
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#7BA7D1', // Темно-голубой для темной темы
            light: '#B8D4F0',
            dark: '#5A8BC4',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#8BB8E8', // Средний голубой
            light: '#C7E0F4',
            dark: '#6B9BD6',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#E8A59B', // Пастельный розовый для темной темы
            light: '#F5B7B1',
            dark: '#D18B7F',
        },
        success: {
            main: '#7DCEA0', // Пастельный зеленый для темной темы
            light: '#A9DFBF',
            dark: '#5BBF7A',
        },
        warning: {
            main: '#F4D03F', // Пастельный желтый для темной темы
            light: '#F9E79F',
            dark: '#D4AC0D',
        },
        info: {
            main: '#85C1E9', // Пастельный синий для темной темы
            light: '#AED6F1',
            dark: '#5DADE2',
        },
        background: {
            default: '#1A2332', // Темно-синий фон
            paper: '#243447', // Светлее для карточек
        },
        text: {
            primary: '#E8F4FD', // Светлый текст
            secondary: '#B8D4F0', // Средний светлый
        },
        divider: 'rgba(123,167,209,0.3)'
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
                    borderRadius: 999,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 12px 32px rgba(79,148,243,0.12)',
                    border: '1px solid rgba(79,148,243,0.18)'
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(79,148,243,0.25)'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 12px 32px rgba(79,148,243,0.12)'
                }
            }
        }
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);