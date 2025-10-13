import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useTranslation} from 'react-i18next';
import {SettingsMenu} from './features/SettingsMenu';
import {useThemeMode} from '../Budgets/theme/ThemeProvider';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    const {t} = useTranslation();
    const location = useLocation();
    const {mode, toggleTheme} = useThemeMode();

    const navItems = [
        {path: '/dashboard', label: t('dashboard')},
        {path: '/analytics', label: t('analytics')},
    ];

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 0, mr: 4}}>
                        💰 FinFlow
                    </Typography>

                    <Box sx={{flexGrow: 1, display: 'flex', gap: 2}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    borderBottom: location.pathname === item.path ? 2 : 0,
                                    borderRadius: 0,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                    <SettingsMenu/>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{flexGrow: 1}}>
                {children}
            </Box>
        </Box>
    );
};