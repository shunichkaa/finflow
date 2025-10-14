import {Budget, Transaction} from "../types";
import {getCategoryById} from "./categories.tsx";
import {formatCurrency, formatDate} from "./formatters.ts";


export const exportToCSV = (
    transactions: Transaction[],
    currency: string
): void => {
    const headers = ['Дата', 'Категория', 'Тип', 'Сумма', 'Описание'];

    const rows = transactions.map((t) => {
        const category = getCategoryById(t.category);
        return [
            formatDate(t.date),
            category?.name || 'Неизвестно',
            t.type === 'income' ? 'Доход' : 'Расход',
            formatCurrency(t.amount, currency),
            t.description || '',
        ];
    });

    const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `finflow_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
};

// Экспорт в JSON
export const exportToJSON = (
    transactions: Transaction[],
    budgets: Budget[]
): void => {
    const data = {
        exportDate: new Date().toISOString(),
        transactions: transactions.map((t) => ({
            ...t,
            date: t.date.toISOString(),
            createdAt: t.createdAt.toISOString(),
        })),
        budgets,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `finflow_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
};

// Импорт из JSON
export const importFromJSON = (
    file: File
): Promise<{ transactions: Transaction[]; budgets: Budget[] }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);

                const transactions = data.transactions.map((t: any) => ({
                    ...t,
                    date: new Date(t.date),
                    createdAt: new Date(t.createdAt),
                }));

                resolve({
                    transactions,
                    budgets: data.budgets || [],
                });
            } catch (error) {
                reject(new Error('Ошибка при чтении файла'));
            }
        };

        reader.onerror = () => reject(new Error('Ошибка при чтении файла'));
        reader.readAsText(file);
    });
};