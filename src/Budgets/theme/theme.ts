import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#4F94F3',
            light: '#A8D0FF',
            dark: '#0E4CB3',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#7FB7FF',
            light: '#CDE6FF',
            dark: '#2E73D8',
            contrastText: '#0D1B2A',
        },
        error: {
            main: '#f87171',
            light: '#fca5a5',
            dark: '#dc2626',
        },
        success: {
            main: '#34d399',
        },
        warning: {
            main: '#fbbf24',
        },
        background: {
            default: '#F6FAFF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0D1B2A',
            secondary: '#51637E',
        },
        divider: 'rgba(79,148,243,0.18)'
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
                    boxShadow: '0 8px 24px rgba(33, 150, 243, 0.05)',
                    border: '1px solid rgba(79, 148, 243, 0.12)'
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
            main: '#7FB7FF',
            light: '#A8D0FF',
            dark: '#4F94F3',
            contrastText: '#0B1220',
        },
        secondary: {
            main: '#9CC9FF',
            light: '#CDE6FF',
            dark: '#4F94F3',
            contrastText: '#0B1220',
        },
        error: {
            main: '#fca5a5',
            light: '#fecaca',
            dark: '#f87171',
        },
        success: {
            main: '#6ee7b7',
        },
        warning: {
            main: '#fcd34d',
        },
        background: {
            default: '#0D1626',
            paper: '#121C2E',
        },
        text: {
            primary: '#E6EEF9',
            secondary: '#A7B8D8',
        },
        divider: 'rgba(159,197,255,0.2)'
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