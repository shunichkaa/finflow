import { Category } from '../types';

export const EXPENSE_CATEGORIES: Category[] = [
    { id: '1', name: 'Еда и продукты', type: 'expense', icon: '🍔', color: '#ef4444' },
    { id: '2', name: 'Транспорт', type: 'expense', icon: '🚗', color: '#3b82f6' },
    { id: '3', name: 'Жильё', type: 'expense', icon: '🏠', color: '#8b5cf6' },
    { id: '4', name: 'Развлечения', type: 'expense', icon: '🎮', color: '#ec4899' },
    { id: '5', name: 'Здоровье', type: 'expense', icon: '⚕️', color: '#10b981' },
    { id: '6', name: 'Образование', type: 'expense', icon: '📚', color: '#f59e0b' },
    { id: '7', name: 'Одежда', type: 'expense', icon: '👕', color: '#6366f1' },
    { id: '8', name: 'Подписки', type: 'expense', icon: '📱', color: '#14b8a6' },
    { id: '9', name: 'Другое', type: 'expense', icon: '💸', color: '#6b7280' },
];

export const INCOME_CATEGORIES: Category[] = [
    { id: '10', name: 'Зарплата', type: 'income', icon: '💼', color: '#22c55e' },
    { id: '11', name: 'Фриланс', type: 'income', icon: '💻', color: '#3b82f6' },
    { id: '12', name: 'Инвестиции', type: 'income', icon: '📈', color: '#8b5cf6' },
    { id: '13', name: 'Подарки', type: 'income', icon: '🎁', color: '#ec4899' },
    { id: '14', name: 'Другое', type: 'income', icon: '💰', color: '#10b981' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryById = (id: string) =>
    ALL_CATEGORIES.find(cat => cat.id === id);

export const getCategoriesByType = (type: 'income' | 'expense') =>
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;