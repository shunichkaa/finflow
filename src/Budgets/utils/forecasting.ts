// Простое скользящее среднее
export function simpleMovingAverage(data: number[], period: number): number[] {
    if (period <= 0 || period > data.length) return [];
    const result: number[] = [];
    for (let i = period - 1; i < data.length; i++) {
        const window = data.slice(i - period + 1, i + 1);
        const avg = window.reduce((a, b) => a + b, 0) / period;
        result.push(avg);
    }
    return result;
}

// Экспоненциальное сглаживание
export function exponentialSmoothing(data: number[], alpha: number): number[] {
    if (data.length === 0) return [];
    const result: number[] = [data[0]];
    for (let i = 1; i < data.length; i++) {
        result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
    }
    return result;
}

// Линейная регрессия (y = slope * x + intercept)
export function linearRegression(data: { x: number; y: number }[]) {
    const n = data.length;
    const sumX = data.reduce((sum, p) => sum + p.x, 0);
    const sumY = data.reduce((sum, p) => sum + p.y, 0);
    const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return {
        slope,
        intercept,
        predict: (x: number) => slope * x + intercept
    };
}

// === Утилиты для конкретных прогнозов ===

// Прогноз расходов на следующий месяц
export function forecastNextMonth(expenses: number[]): number {
    const smoothed = exponentialSmoothing(expenses, 0.3);
    const last = smoothed[smoothed.length - 1];
    return Math.round(last);
}

// Когда закончатся деньги при текущих тратах
export function predictDepletion(balance: number, dailyExpenses: number): number {
    if (dailyExpenses <= 0) return Infinity;
    return Math.ceil(balance / dailyExpenses); // в днях
}

// Рекомендуемый ежедневный лимит (на основе среднего за последние месяцы)
export function recommendedDailyLimit(monthlyIncome: number, fixedExpenses: number, avgVariableExpenses: number): number {
    const available = monthlyIncome - fixedExpenses;
    const limit = (available - avgVariableExpenses) / 30;
    return Math.max(0, Math.round(limit));
}