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
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {SvgIconTypeMap} from '@mui/material/SvgIcon';

const iconComponents: Record<string, OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>> = {
    restaurant: RestaurantIcon,
    cafe: LocalCafeIcon,
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

export const getCategoryIcon = (iconName: string, size: number = 24): React.ReactElement => {
    const IconComponent = iconComponents[iconName] || MoreHorizIcon;
    return <IconComponent sx={{ fontSize: size }} />;
};

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
        '9': 'category.cafe',
        '10': 'category.other',
        '11': 'category.salary',
        '12': 'category.freelance',
        '13': 'category.investment',
        '14': 'category.gift',
        '15': 'category.other',
    };
    return t(categoryKeys[categoryId] || 'category.other');
};

export const EXPENSE_CATEGORIES: Category[] = [
    {id: '1', name: 'Еда и продукты', type: 'expense', icon: 'restaurant', color: '#FFB3BA'},
    {id: '2', name: 'Транспорт', type: 'expense', icon: 'car', color: '#BAE1DA'},
    {id: '3', name: 'Жильё', type: 'expense', icon: 'home', color: '#C7CEEA'},
    {id: '4', name: 'Развлечения', type: 'expense', icon: 'gaming', color: '#D4BBDD'},
    {id: '5', name: 'Здоровье', type: 'expense', icon: 'hospital', color: '#B5EAD7'},
    {id: '6', name: 'Образование', type: 'expense', icon: 'school', color: '#FFD7BA'},
    {id: '7', name: 'Одежда', type: 'expense', icon: 'clothes', color: '#FFE5F1'},
    {id: '8', name: 'Подписки', type: 'expense', icon: 'subscriptions', color: '#C3E5E1'},
    {id: '9', name: 'Кафе/рестораны', type: 'expense', icon: 'cafe', color: '#FFDAC1'},
    {id: '10', name: 'Другое', type: 'expense', icon: 'more', color: '#E0D5F3'},
];

export const INCOME_CATEGORIES: Category[] = [
    {id: '11', name: 'Зарплата', type: 'income', icon: 'work', color: '#B5EAD7'},
    {id: '12', name: 'Фриланс', type: 'income', icon: 'laptop', color: '#BAE1DA'},
    {id: '13', name: 'Инвестиции', type: 'income', icon: 'trending', color: '#C7CEEA'},
    {id: '14', name: 'Подарки', type: 'income', icon: 'gift', color: '#FFE5F1'},
    {id: '15', name: 'Другое', type: 'income', icon: 'wallet', color: '#D4E5F3'},
];
export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryById = (id: string) =>
    ALL_CATEGORIES.find(cat => cat.id === id);

export const getCategoriesByType = (type: 'income' | 'expense') =>
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;