import {Budget, Transaction} from "../types";

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

    const blob = new Blob(['\uFEFF' + csvContent], {type: 'text/csv;charset=utf-8;'});
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

    const blob = new Blob(['\uFEFF' + content], {type: 'application/vnd.ms-excel;charset=utf-8;'});
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
export const exportToPDF = (transactions: Transaction[], budgets: Budget[]) => {
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
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    margin: 40px; 
                    line-height: 1.6;
                    color: #5a5a5a;
                }
                h1 { 
                    color: #89CFF0; 
                    text-align: center;
                    margin-bottom: 10px;
                }
                h2 { 
                    color: #8A9A5B; 
                    margin-top: 30px;
                    border-bottom: 2px solid #E6E6FA;
                    padding-bottom: 8px;
                }
                .summary { 
                    background: #F8F8FF; 
                    padding: 25px; 
                    border-radius: 12px; 
                    margin: 25px 0; 
                    border-left: 4px solid #89CFF0;
                }
                .summary-item { 
                    display: flex; 
                    justify-content: space-between; 
                    margin: 12px 0; 
                    padding: 8px 0;
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 25px 0; 
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border-radius: 8px;
                    overflow: hidden;
                }
                th, td { 
                    border: 1px solid #E6E6FA; 
                    padding: 14px; 
                    text-align: left; 
                }
                th { 
                    background-color: #B5EAD7; 
                    color: #5a5a5a; 
                    font-weight: 600;
                }
                tr:nth-child(even) { 
                    background-color: #F8F8FF; 
                }
                tr:hover {
                    background-color: #F0F8FF;
                }
                .income { 
                    color: #77DD77; 
                    font-weight: 600; 
                }
                .expense { 
                    color: #FFB6C1; 
                    font-weight: 600; 
                }
                .footer { 
                    margin-top: 50px; 
                    text-align: center; 
                    color: #A9A9A9; 
                    font-style: italic;
                    padding: 20px;
                    border-top: 1px solid #E6E6FA;
                }
                .report-date {
                    text-align: center;
                    color: #A9A9A9;
                    margin-bottom: 30px;
                }
                .balance-positive {
                    color: #77DD77;
                    font-weight: 600;
                }
                .balance-negative {
                    color: #FFB6C1;
                    font-weight: 600;
                }
                @media print {
                    body { margin: 20px; }
                    .summary { background: #F8F8FF !important; }
                    table { box-shadow: none; }
                }
            </style>
        </head>
        <body>
            <h1>FinFlow - Финансовый отчет</h1>
            <div class="report-date">Дата формирования: ${new Date().toLocaleDateString('ru-RU')}</div>
            
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
                    <span class="${balance >= 0 ? 'balance-positive' : 'balance-negative'}">
                        ${balance.toFixed(2)} €
                    </span>
                </div>
                <div class="summary-item">
                    <span>Всего транзакций:</span>
                    <span>${transactions.length}</span>
                </div>
            </div>

            <h2>Транзакции</h2>
            ${transactions.length > 0 ? `
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
            ` : '<p>Нет данных о транзакциях</p>'}

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

            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    }
};