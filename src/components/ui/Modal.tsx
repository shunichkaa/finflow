import React from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { mode } = useThemeMode();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: fullScreen ? 0 : 3,
                    bgcolor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                    backdropFilter: 'blur(10px)',
                },
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                bgcolor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            }}>
                {title}
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ color: mode === 'dark' ? '#F5F5DC' : '#654633' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ 
                bgcolor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                color: mode === 'dark' ? '#F5F5DC' : '#654633',
            }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};