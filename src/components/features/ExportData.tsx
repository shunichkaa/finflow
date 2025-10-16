import React from 'react';
import {Button, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../Budgets/store/useFinanceStore';
import {exportToCSV, exportToExcel, exportToPDF} from "../../Budgets/utils/exportUtils.ts";


export const ExportData: React.FC = () => {
    const {t} = useTranslation();
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
                variant="outlined"
                startIcon={<DownloadIcon/>}
                onClick={handleClick}
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