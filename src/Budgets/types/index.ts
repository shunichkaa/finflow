// ============================================
// БАЗОВЫЕ ТИПЫ
// ============================================

/**
 * Тип транзакции - либо доход, либо расход
 */
export type TransactionType = 'income' | 'expense';

/**
 * Период для бюджета
 */
export type BudgetPeriod = 'monthly' | 'weekly';

// ============================================
// ИНТЕРФЕЙСЫ
// ============================================

/**
 * Транзакция - основная сущность приложения
 */
export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: string;
    description: string;
    date: Date;
    createdAt: Date;
}

/**
 * Бюджет - лимит расходов на категорию
 */
export interface Budget {
    id: string;
    category: string;
    limit: number;
    period: BudgetPeriod;
}

/**
 * Цель/копилка - накопление на определенную цель
 */
export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    description?: string;
    targetDate?: Date;
    createdAt: Date;
    isCompleted: boolean;
}

/**
 * Категория - группировка транзакций
 */
export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
    color: string;
}


// ============================================
// UTILITY TYPES
// ============================================

export type CreateTransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
export type CreateBudgetInput = Omit<Budget, 'id'>;
export type CreateGoalInput = Omit<Goal, 'id' | 'createdAt' | 'isCompleted'>;

// ============================================
// ФИЛЬТРЫ
// ============================================

export interface TransactionFilters {
    type?: TransactionType | 'all';
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    searchQuery?: string;
}

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
