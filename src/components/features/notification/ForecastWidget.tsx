import React from 'react';

import {Box, Card, CardContent, LinearProgress, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {forecastNextMonth, predictDepletion, recommendedDailyLimit} from "../../../Budgets/utils/forecasting.ts";
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';

interface ForecastWidgetProps {
    expensesHistory: number[];
    balance: number;
    dailyAverage: number;
    monthlyIncome: number;
    fixedExpenses: number;
}

export const ForecastWidget: React.FC<ForecastWidgetProps> = ({
                                                                  expensesHistory,
                                                                  balance,
                                                                  dailyAverage,
                                                                  monthlyIncome,
                                                                  fixedExpenses
                                                              }) => {
    const {t} = useTranslation();
    const { mode } = useThemeMode();

    const nextMonthForecast = forecastNextMonth(expensesHistory);
    const daysLeft = predictDepletion(balance, dailyAverage);
    const dailyLimit = recommendedDailyLimit(monthlyIncome, fixedExpenses, nextMonthForecast);

    return (
        <Card sx={{borderRadius: 3, boxShadow: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {t('forecast.title', 'Прогноз расходов')}
                </Typography>

                <Box mb={2}>
                    <Typography variant="body1">
                        {t('forecast.nextMonth', 'Прогноз расходов на следующий месяц')}: <b>{nextMonthForecast} €</b>
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Typography variant="body1">
                        {t('forecast.depletion', 'Средств хватит примерно на')}: <b>{daysLeft} {t('days', 'дней')}</b>
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min((dailyAverage * 30) / balance * 100, 100)}
                        sx={{
                            mt: 1, 
                            height: 12, 
                            borderRadius: 6,
                            backgroundColor: mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(6, 0, 171, 0.1)',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                background: mode === 'dark'
                                    ? 'linear-gradient(90deg, #6C6FF9 0%, #6C6FF9CC 100%)'
                                    : 'linear-gradient(90deg, #6C6FF9 0%, #6C6FF9CC 100%)',
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body1">
                        {t('forecast.dailyLimit', 'Рекомендуемый дневной лимит')}: <b>{dailyLimit} €</b>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};