import React from 'react';

import {Button, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../Budgets/store/useFinanceStore';
import {exportToCSV, exportToExcel, exportToPDF} from "../../Budgets/utils/exportUtils.ts";
import {useThemeMode} from '../../Budgets/theme/ThemeContext';


export const ExportData: React.FC = () => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const transactions = useFinanceStore((state) => state.transactions);
    const budgets = useFinanceStore((state) => state.budgets);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExportCSV = () => {
        exportToCSV(transactions, 'finflow-transactions');
        handleClose();
    };

    const handleExportExcel = () => {
        exportToExcel(transactions, budgets, 'finflow-data');
        handleClose();
    };

    const handleExportPDF = () => {
        exportToPDF(transactions, budgets); // Убрал третий параметр
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<DownloadIcon/>}
                onClick={handleClick}
                sx={{
                 background: mode === 'dark'
                     ? 'rgba(255, 185, 141, 0.8)'
                     : 'rgba(255, 185, 141, 0.8)',
                    color: mode === 'dark' ? '#654633' : '#654633',
                    fontWeight: 'bold',
                    border: mode === 'dark' 
                        ? '2px solid rgba(255, 185, 141, 0.6)'
                        : '2px solid rgba(255, 185, 141, 0.6)',
                    '&:hover': {
                        background: mode === 'dark' 
                            ? 'rgba(255, 185, 141, 1)'
                            : 'rgba(255, 185, 141, 1)',
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 25px rgba(255, 185, 141, 0.4)'
                            : '0 8px 25px rgba(255, 185, 141, 0.4)',
                    }
                }}
            >
                {t('export')}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleExportCSV}>
                    <ListItemIcon>
                        <TableChartIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>{t('exportCSV')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleExportExcel}>
                    <ListItemIcon>
                        <TableChartIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>{t('exportExcel')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleExportPDF}>
                    <ListItemIcon>
                        <PictureAsPdfIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>{t('exportPDF')}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};