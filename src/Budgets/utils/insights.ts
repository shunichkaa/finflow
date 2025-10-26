import {v4 as uuid} from 'uuid';


export interface Insight {
    id: string;
    type: 'warning' | 'info' | 'success' | 'tip';
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

function mean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
}

function stdDev(values: number[]): number {
    const avg = mean(values);
    const variance = mean(values.map(v => (v - avg) ** 2));
    return Math.sqrt(variance);
}

export function detectAnomalies(expenses: Record<string, number>): Insight[] {
    const categories = Object.keys(expenses);
    const values = Object.values(expenses);

    const avg = mean(values);
    const deviation = stdDev(values);

    const insights: Insight[] = [];

    categories.forEach(category => {
        const value = expenses[category];
        const diff = value - avg;

        if (diff > 2 * deviation) {
            insights.push({
                id: uuid(),
                type: 'warning',
                title: `Аномально высокая трата`,
                description: `Вы потратили на категорию "${category}" значительно больше, чем обычно (${value.toFixed(2)} €).`
            });
        } else if (diff < -2 * deviation) {
            insights.push({
                id: uuid(),
                type: 'info',
                title: `Снижение расходов`,
                description: `Расходы по категории "${category}" ниже обычного. Отличный результат!`
            });
        }
    });

    return insights;
}

export function compareWithPreviousMonth(current: Record<string, number>, previous: Record<string, number>): Insight[] {
    const insights: Insight[] = [];

    for (const category in current) {
        const curr = current[category] || 0;
        const prev = previous[category] || 0;
        if (prev === 0) continue;

        const change = ((curr - prev) / prev) * 100;

        if (change > 30) {
            insights.push({
                id: uuid(),
                type: 'warning',
                title: `Рост расходов на ${category}`,
                description: `Траты выросли на ${change.toFixed(0)}% по сравнению с прошлым месяцем.`
            });
        } else if (change < -20) {
            insights.push({
                id: uuid(),
                type: 'success',
                title: `Снижение расходов на ${category}`,
                description: `Вы сократили траты на ${Math.abs(change).toFixed(0)}%. Отлично!`
            });
        }
    }

    return insights;
}

export function generateGeneralInsights(balance: number, daysToSalary: number): Insight[] {
    const insights: Insight[] = [];

    if (balance < 100) {
        insights.push({
            id: uuid(),
            type: 'warning',
            title: 'Баланс на исходе',
            description: 'Осталось меньше 100€. Будьте внимательнее к тратам.'
        });
    }

    if (daysToSalary <= 3 && balance > 0) {
        insights.push({
            id: uuid(),
            type: 'info',
            title: 'Скоро зарплата',
            description: `Осталось продержаться ${daysToSalary} дня(ей)!`
        });
    }

    if (balance > 500 && daysToSalary <= 5) {
        insights.push({
            id: uuid(),
            type: 'success',
            title: 'Отличная работа!',
            description: 'Вы сэкономили значительную сумму к концу месяца.'
        });
    }

    return insights;
}

export function generateInsights({
                                     currentMonthExpenses,
                                     previousMonthExpenses,
                                     balance,
                                     daysToSalary
                                 }: {
    currentMonthExpenses: Record<string, number>;
    previousMonthExpenses: Record<string, number>;
    balance: number;
    daysToSalary: number;
}): Insight[] {
    const anomalies = detectAnomalies(currentMonthExpenses);
    const trends = compareWithPreviousMonth(currentMonthExpenses, previousMonthExpenses);
    const general = generateGeneralInsights(balance, daysToSalary);

    return [...anomalies, ...trends, ...general];
}