

export type TransactionType = 'income' | 'expense';


export type BudgetPeriod = 'monthly' | 'weekly';



export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: string;
    description: string;
    date: Date;
    createdAt: Date;
}


export interface Budget {
    id: string;
    category: string;
    limit: number;
    period: BudgetPeriod;
}


export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    description?: string;
    targetDate?: Date;
    createdAt: Date;
    isCompleted: boolean;
    icon?: string; // ID иконки из GOAL_ICONS
}


export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
    color: string;
}



export type CreateTransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
export type CreateBudgetInput = Omit<Budget, 'id'>;
export type CreateGoalInput = Omit<Goal, 'id' | 'createdAt' | 'isCompleted'>;


export interface TransactionFilters {
    type?: TransactionType | 'all';
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    searchQuery?: string;
}

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
