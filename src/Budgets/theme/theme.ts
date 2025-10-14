import type {ThemeOptions} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#6A92C8',
            light: '#92bcfa',
            dark: '#0E2D6C',
        },
        secondary: {
            main: '#10b981',
            light: '#6ee7b7',
            dark: '#059669',
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
            default: '#faf5ff',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 2px rgb(0 0 0 / 0.06)',
                    border: '1px solid rgba(0,0,0,0.06)'
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0,0,0,0.06)'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 1px 2px rgb(0 0 0 / 0.06)'
                }
            }
        }
    },
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#92bcfa',
            light: '#c2d1ec',
            dark: '#6a92c8',
        },
        secondary: {
            main: '#6ee7b7',
            light: '#a7f3d0',
            dark: '#34d399',
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
            default: '#1e1b2e',
            paper: '#2d2a3e',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 2px rgb(0 0 0 / 0.3)',
                    border: '1px solid rgba(255,255,255,0.08)'
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 1px 2px rgb(0 0 0 / 0.3)'
                }
            }
        }
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);