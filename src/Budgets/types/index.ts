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
 * Категория - группировка транзакций
 */
export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    icon: React.ElementType;
    color: string;
}


// ============================================
// UTILITY TYPES
// ============================================

export type CreateTransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
export type UpdateTransactionInput = Partial<Omit<Transaction, 'id' | 'createdAt'>>;
export type CreateBudgetInput = Omit<Budget, 'id'>;

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

// ============================================
// СТАТИСТИКА
// ============================================

export interface DashboardStats {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionsCount: number;
}

export interface CategoryStats {
    categoryId: string;
    categoryName: string;
    totalAmount: number;
    transactionsCount: number;
    percentage: number;
}

// ============================================
// ДАННЫЕ ДЛЯ ГРАФИКОВ
// ============================================

export interface BalanceChartData {
    date: string;
    balance: number;
}

export interface IncomeExpenseChartData {
    period: string;
    income: number;
    expense: number;
}

export interface PieChartData {
    name: string;
    value: number;
    color: string;
}