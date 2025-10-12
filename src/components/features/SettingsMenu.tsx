import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';
import { useSettingsStore, Language, Currency } from '../../store/useSettingsStore';

export const SettingsMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { language, currency, setLanguage, setCurrency } = useSettingsStore();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'me', label: 'Crnogorski', flag: '🇲🇪' },
    ];

    const currencies: Currency[] = ['EUR', 'USD', 'RUB'];

    return (
        <>
            <IconButton onClick={handleClick} color="inherit">
                <SettingsIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled>
                    <ListItemIcon>
                        <LanguageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Язык / Language</ListItemText>
                </MenuItem>

                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => {
                            setLanguage(lang.code);
                            handleClose();
                        }}
                        selected={language === lang.code}
                    >
                        <ListItemText inset>
                            {lang.flag} {lang.label}
                        </ListItemText>
                        {language === lang.code && (
                            <CheckIcon fontSize="small" color="primary" />
                        )}
                    </MenuItem>
                ))}

                <Divider />

                <MenuItem disabled>
                    <ListItemIcon>
                        <AttachMoneyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Валюта / Currency</ListItemText>
                </MenuItem>

                {currencies.map((curr) => (
                    <MenuItem
                        key={curr}
                        onClick={() => {
                            setCurrency(curr);
                            handleClose();
                        }}
                        selected={currency === curr}
                    >
                        <ListItemText inset>{curr}</ListItemText>
                        {currency === curr && (
                            <CheckIcon fontSize="small" color="primary" />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};