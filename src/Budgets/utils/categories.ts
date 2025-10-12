import { Category } from '../types';
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


export const EXPENSE_CATEGORIES: Category[] = [
    { id: '1', name: 'Еда и продукты', type: 'expense', icon: RestaurantIcon, color: '#f9c1c1' },
    { id: '2', name: 'Транспорт', type: 'expense', icon: DirectionsCarIcon, color: '#a8d0ff' },
    { id: '3', name: 'Жильё', type: 'expense', icon: HomeIcon, color: '#c5b3ff' },
    { id: '4', name: 'Развлечения', type: 'expense', icon: SportsEsportsIcon, color: '#f4b6e3' },
    { id: '5', name: 'Здоровье', type: 'expense', icon: LocalHospitalIcon, color: '#a1e3c0' },
    { id: '6', name: 'Образование', type: 'expense', icon: SchoolIcon, color: '#ffe4a1' },
    { id: '7', name: 'Одежда', type: 'expense', icon: CheckroomIcon, color: '#bfc8ff' },
    { id: '8', name: 'Подписки', type: 'expense', icon: SubscriptionsIcon, color: '#a0e3d2' },
    { id: '9', name: 'Другое', type: 'expense', icon: MoreHorizIcon, color: '#d1d5db' },
];

export const INCOME_CATEGORIES: Category[] = [
    { id: '10', name: 'Зарплата', type: 'income', icon: WorkIcon, color: '#b4f1a1' },
    { id: '11', name: 'Фриланс', type: 'income', icon: LaptopMacIcon, color: '#a8d0ff' },
    { id: '12', name: 'Инвестиции', type: 'income', icon: TrendingUpIcon, color: '#c5b3ff' },
    { id: '13', name: 'Подарки', type: 'income', icon: CardGiftcardIcon, color: '#f4b6e3' },
    { id: '14', name: 'Другое', type: 'income', icon: AccountBalanceWalletIcon, color: '#a1e3c0' },
];


export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryById = (id: string) =>
    ALL_CATEGORIES.find(cat => cat.id === id);

export const getCategoriesByType = (type: 'income' | 'expense') =>
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;