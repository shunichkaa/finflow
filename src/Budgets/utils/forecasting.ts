
// Экспоненциальное сглаживание
export function exponentialSmoothing(data: number[], alpha: number): number[] {
    if (data.length === 0) return [];
    if (alpha < 0 || alpha > 1) alpha = 0.3; // Валидация alpha
    const result: number[] = [data[0]];
    for (let i = 1; i < data.length; i++) {
        result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
    }
    return result;
}

// Линейная регрессия (y = slope * x + intercept)
export function linearRegression(data: { x: number; y: number }[]) {
    if (data.length === 0) {
        return {
            slope: 0,
            intercept: 0,
            predict: (_x: number) => 0
        };
    }
    
    const n = data.length;
    const sumX = data.reduce((sum, p) => sum + p.x, 0);
    const sumY = data.reduce((sum, p) => sum + p.y, 0);
    const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0);

    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) {
        return {
            slope: 0,
            intercept: sumY / n,
            predict: (_x: number) => sumY / n
        };
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
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
    if (expenses.length === 0) return 0;
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
    if (monthlyIncome <= 0) return 0;
    const available = monthlyIncome - fixedExpenses;
    const limit = (available - avgVariableExpenses) / 30;
    return Math.max(0, Math.round(limit));
}