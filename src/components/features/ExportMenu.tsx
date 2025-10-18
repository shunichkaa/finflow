import React from 'react';
import { useState, useRef } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Alert,
    Snackbar,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { exportToCSV, exportToJSON, importFromJSON } from "../../Budgets/utils/exportData";

export const ExportMenu: React.FC = () => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const transactions = useFinanceStore((state) => state.transactions);
    const budgets = useFinanceStore((state) => state.budgets);
    const { currency } = useSettingsStore();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExportCSV = () => {
        try {
            exportToCSV(transactions, currency);
            setSnackbar({ open: true, message: t('exportSuccess'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('exportError'), severity: 'error' });
        }
        handleClose();
    };

    const handleExportJSON = () => {
        try {
            exportToJSON(transactions, budgets);
            setSnackbar({ open: true, message: t('exportSuccess'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('exportError'), severity: 'error' });
        }
        handleClose();
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
        handleClose();
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            await importFromJSON(file);
            setSnackbar({ open: true, message: t('importSuccess'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('importError'), severity: 'error' });
        }
    };

    return (
        <>
            <IconButton onClick={handleClick} color="inherit">
                <FileDownloadIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleExportCSV}>
                    <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('exportCSV')}</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleExportJSON}>
                    <ListItemIcon>
                        <CodeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('exportJSON')}</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleImportClick}>
                    <ListItemIcon>
                        <UploadFileIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('importJSON')}</ListItemText>
                </MenuItem>
            </Menu>

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};