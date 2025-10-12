import { Category } from '../types';

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