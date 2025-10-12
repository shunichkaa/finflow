import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WorkIcon from '@mui/icons-material/Work';
import LaptopIcon from '@mui/icons-material/Laptop';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { Category } from '../types';


export const getCategoryIcon = (
    iconName: string,
    size: 'small' | 'medium' | 'large' = 'medium'
): React.ReactElement => {
    const iconMap: Record<string, React.ComponentType<SvgIconProps>> = {
        restaurant: RestaurantIcon,
        car: DirectionsCarIcon,
        home: HomeIcon,
        gaming: SportsEsportsIcon,
        hospital: LocalHospitalIcon,
        school: SchoolIcon,
        clothes: CheckroomIcon,
        subscriptions: SubscriptionsIcon,
        more: MoreHorizIcon,
        work: WorkIcon,
        laptop: LaptopIcon,
        trending: TrendingUpIcon,
        gift: CardGiftcardIcon,
        wallet: AccountBalanceWalletIcon,
    };

    const IconComponent = iconMap[iconName] || MoreHorizIcon;
    const fontSize = size === 'small' ? 20 : size === 'large' ? 32 : 24;

    return React.createElement(IconComponent, { sx: { fontSize } });
};

// Или используем более простой подход с объектом готовых иконок
export const CategoryIcons: Record<string, React.ReactElement> = {
    restaurant: React.createElement(RestaurantIcon),
    car: React.createElement(DirectionsCarIcon),
    home: React.createElement(HomeIcon),
    gaming: React.createElement(SportsEsportsIcon),
    hospital: React.createElement(LocalHospitalIcon),
    school: React.createElement(SchoolIcon),
    clothes: React.createElement(CheckroomIcon),
    subscriptions: React.createElement(SubscriptionsIcon),
    more: React.createElement(MoreHorizIcon),
    work: React.createElement(WorkIcon),
    laptop: React.createElement(LaptopIcon),
    trending: React.createElement(TrendingUpIcon),
    gift: React.createElement(CardGiftcardIcon),
    wallet: React.createElement(AccountBalanceWalletIcon),
};

export const getCategoryIconAlt = (
    iconName: string,
    size: 'small' | 'medium' | 'large' = 'medium'
): React.ReactElement => {
    const fontSize = size === 'small' ? 20 : size === 'large' ? 32 : 24;
    const baseIcon = CategoryIcons[iconName] || CategoryIcons.more;

    return React.cloneElement(baseIcon, { sx: { fontSize } });
};

export const EXPENSE_CATEGORIES: Category[] = [
    { id: '1', name: 'Еда и продукты', type: 'expense', icon: 'restaurant', color: '#f9c1c1' },
    { id: '2', name: 'Транспорт', type: 'expense', icon: 'car', color: '#a8d0ff' },
    { id: '3', name: 'Жильё', type: 'expense', icon: 'home', color: '#c5b3ff' },
    { id: '4', name: 'Развлечения', type: 'expense', icon: 'gaming', color: '#f4b6e3' },
    { id: '5', name: 'Здоровье', type: 'expense', icon: 'hospital', color: '#a1e3c0' },
    { id: '6', name: 'Образование', type: 'expense', icon: 'school', color: '#ffe4a1' },
    { id: '7', name: 'Одежда', type: 'expense', icon: 'clothes', color: '#bfc8ff' },
    { id: '8', name: 'Подписки', type: 'expense', icon: 'subscriptions', color: '#a0e3d2' },
    { id: '9', name: 'Другое', type: 'expense', icon: 'more', color: '#d1d5db' },
];

export const INCOME_CATEGORIES: Category[] = [
    { id: '10', name: 'Зарплата', type: 'income', icon: 'work', color: '#b4f1a1' },
    { id: '11', name: 'Фриланс', type: 'income', icon: 'laptop', color: '#a8d0ff' },
    { id: '12', name: 'Инвестиции', type: 'income', icon: 'trending', color: '#c5b3ff' },
    { id: '13', name: 'Подарки', type: 'income', icon: 'gift', color: '#f4b6e3' },
    { id: '14', name: 'Другое', type: 'income', icon: 'wallet', color: '#a1e3c0' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryById = (id: string) =>
    ALL_CATEGORIES.find(cat => cat.id === id);

export const getCategoriesByType = (type: 'income' | 'expense') =>
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;