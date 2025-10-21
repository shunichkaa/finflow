import React from 'react';

import {Category} from '../types';
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
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {SvgIconTypeMap} from '@mui/material/SvgIcon';

// Маппинг иконок с корректным типом
const iconComponents: Record<string, OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>> = {
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
    laptop: LaptopMacIcon,
    trending: TrendingUpIcon,
    gift: CardGiftcardIcon,
    wallet: AccountBalanceWalletIcon,
};

// Функция для получения иконки
export const getCategoryIcon = (iconName: string, size: number = 24): React.ReactElement => {
    const IconComponent = iconComponents[iconName] || MoreHorizIcon;
    return <IconComponent sx={{ fontSize: size }} />;
};

// Функция для перевода названия категории
export const getCategoryName = (categoryId: string, t: (key: string) => string) => {
    const categoryKeys: Record<string, string> = {
        '1': 'category.food',
        '2': 'category.transport',
        '3': 'category.housing',
        '4': 'category.entertainment',
        '5': 'category.health',
        '6': 'category.education',
        '7': 'category.clothing',
        '8': 'category.subscriptions',
        '9': 'category.other',
        '10': 'category.salary',
        '11': 'category.freelance',
        '12': 'category.investment',
        '13': 'category.gift',
        '14': 'category.other',
    };
    return t(categoryKeys[categoryId] || 'category.other');
};

// Категории расходов - iOS 26 Liquid Glass Palette
export const EXPENSE_CATEGORIES: Category[] = [
    {id: '1', name: 'Еда и продукты', type: 'expense', icon: 'restaurant', color: '#FF6B6B'},
    {id: '2', name: 'Транспорт', type: 'expense', icon: 'car', color: '#4ECDC4'},
    {id: '3', name: 'Жильё', type: 'expense', icon: 'home', color: '#A8A3F6'},
    {id: '4', name: 'Развлечения', type: 'expense', icon: 'gaming', color: '#8B5CF6'},
    {id: '5', name: 'Здоровье', type: 'expense', icon: 'hospital', color: '#96CEB4'},
    {id: '6', name: 'Образование', type: 'expense', icon: 'school', color: '#FFB347'},
    {id: '7', name: 'Одежда', type: 'expense', icon: 'clothes', color: '#F6D5EE'},
    {id: '8', name: 'Подписки', type: 'expense', icon: 'subscriptions', color: '#96CEB4'},
    {id: '9', name: 'Другое', type: 'expense', icon: 'more', color: '#B8A6FF'},
];

// Категории доходов - iOS 26 Liquid Glass Palette
export const INCOME_CATEGORIES: Category[] = [
    {id: '10', name: 'Зарплата', type: 'income', icon: 'work', color: '#96CEB4'},
    {id: '11', name: 'Фриланс', type: 'income', icon: 'laptop', color: '#4ECDC4'},
    {id: '12', name: 'Инвестиции', type: 'income', icon: 'trending', color: '#6366F1'},
    {id: '13', name: 'Подарки', type: 'income', icon: 'gift', color: '#F6D5EE'},
    {id: '14', name: 'Другое', type: 'income', icon: 'wallet', color: '#4ECDC4'},
];
export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryById = (id: string) =>
    ALL_CATEGORIES.find(cat => cat.id === id);

export const getCategoriesByType = (type: 'income' | 'expense') =>
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;