import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#86B6F6',
            light: '#DCEBFF',
            dark: '#3D7FD9',
            contrastText: '#0B1220',
        },
        secondary: {
            main: '#9EC9FF',
            light: '#E6F2FF',
            dark: '#5AA0EA',
            contrastText: '#0B1220',
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
            default: '#F9FBFF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0D1B2A',
            secondary: '#51637E',
        },
        divider: 'rgba(134,182,246,0.2)'
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
            main: '#78A9F2',
            light: '#BFD9FF',
            dark: '#3A7DD6',
            contrastText: '#0B1220',
        },
        secondary: {
            main: '#94C4FF',
            light: '#CFE7FF',
            dark: '#3978D0',
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
            default: '#0E1525',
            paper: '#121A2E',
        },
        text: {
            primary: '#E6EEF9',
            secondary: '#A7B8D8',
        },
        divider: 'rgba(148,196,255,0.22)'
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