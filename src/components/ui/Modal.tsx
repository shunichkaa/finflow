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
                    bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                    backdropFilter: 'blur(10px)',
                },
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
            }}>
                {title}
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ 
                bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
            }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};