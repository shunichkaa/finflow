import type { Transaction, Budget } from '../Budgets/types';

// Экспорт в CSV
export const exportToCSV = (transactions: Transaction[], filename: string) => {
    const headers = ['Дата', 'Тип', 'Категория', 'Сумма', 'Описание'];
    const rows = transactions.map(t => [
        new Date(t.date).toLocaleDateString('ru-RU'),
        t.type === 'income' ? 'Доход' : 'Расход',
        t.category,
        t.amount.toString(),
        t.description || '',
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Экспорт в Excel (упрощенный CSV с расширением .xls)
export const exportToExcel = (transactions: Transaction[], budgets: Budget[], filename: string) => {
    // Транзакции
    const transactionHeaders = ['Дата', 'Тип', 'Категория', 'Сумма', 'Описание'];
    const transactionRows = transactions.map(t => [
        new Date(t.date).toLocaleDateString('ru-RU'),
        t.type === 'income' ? 'Доход' : 'Расход',
        t.category,
        t.amount.toString(),
        t.description || '',
    ]);

    // Бюджеты
    const budgetHeaders = ['Категория', 'Лимит', 'Период'];
    const budgetRows = budgets.map(b => [
        b.category,
        b.limit.toString(),
        b.period === 'monthly' ? 'Месяц' : 'Неделя',
    ]);

    const content = [
        'ТРАНЗАКЦИИ',
        transactionHeaders.join('\t'),
        ...transactionRows.map(row => row.join('\t')),
        '',
        'БЮДЖЕТЫ',
        budgetHeaders.join('\t'),
        ...budgetRows.map(row => row.join('\t')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + content], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Экспорт в PDF (упрощенная версия - создаем HTML и открываем для печати)
export const exportToPDF = (transactions: Transaction[], budgets: Budget[], filename: string) => {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>FinFlow - Финансовый отчет</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #1976d2; }
                h2 { color: #333; margin-top: 30px; }
                .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .summary-item { display: flex; justify-content: space-between; margin: 10px 0; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #1976d2; color: white; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                .income { color: #4caf50; font-weight: bold; }
                .expense { color: #f44336; font-weight: bold; }
                .footer { margin-top: 40px; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            <h1>FinFlow - Финансовый отчет</h1>
            <p>Дата формирования: ${new Date().toLocaleDateString('ru-RU')}</p>
            
            <div class="summary">
                <h2>Сводка</h2>
                <div class="summary-item">
                    <span>Всего доходов:</span>
                    <span class="income">${income.toFixed(2)} €</span>
                </div>
                <div class="summary-item">
                    <span>Всего расходов:</span>
                    <span class="expense">${expenses.toFixed(2)} €</span>
                </div>
                <div class="summary-item">
                    <span>Баланс:</span>
                    <span style="color: ${balance >= 0 ? '#4caf50' : '#f44336'}; font-weight: bold;">
                        ${balance.toFixed(2)} €
                    </span>
                </div>
                <div class="summary-item">
                    <span>Всего транзакций:</span>
                    <span>${transactions.length}</span>
                </div>
            </div>

            <h2>Транзакции</h2>
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Тип</th>
                        <th>Категория</th>
                        <th>Сумма</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions.map(t => `
                        <tr>
                            <td>${new Date(t.date).toLocaleDateString('ru-RU')}</td>
                            <td>${t.type === 'income' ? 'Доход' : 'Расход'}</td>
                            <td>${t.category}</td>
                            <td class="${t.type}">${t.amount.toFixed(2)} €</td>
                            <td>${t.description || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            ${budgets.length > 0 ? `
                <h2>Бюджеты</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Категория</th>
                            <th>Лимит</th>
                            <th>Период</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${budgets.map(b => `
                            <tr>
                                <td>${b.category}</td>
                                <td>${b.limit.toFixed(2)} €</td>
                                <td>${b.period === 'monthly' ? 'Месяц' : 'Неделя'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : ''}

            <div class="footer">
                <p>Создано с помощью FinFlow - Умное управление финансами</p>
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.print();
        };
    }
};