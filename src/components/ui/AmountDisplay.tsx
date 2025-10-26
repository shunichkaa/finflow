import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { designTokens } from '../../Budgets/theme/designTokens';
import { formatCurrency } from '../../Budgets/utils/formatters';
import { Currency } from '../../Budgets/store/useSettingsStore';

interface AmountDisplayProps extends Omit<TypographyProps, 'color'> {
  amount: number;
  currency: Currency;
  type: 'income' | 'expense';
  showSign?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  size?: 'small' | 'medium' | 'large';
}

export const AmountDisplay: React.FC<AmountDisplayProps> = ({
  amount,
  currency,
  type,
  showSign = true,
  variant = 'h6',
  size = 'medium',
  sx,
  ...props
}) => {
  const getColor = () => {
    return type === 'income' ? designTokens.colors.success.main : designTokens.colors.error.main;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: designTokens.typography.fontSize.sm,
          fontWeight: designTokens.typography.fontWeight.semibold,
        };
      case 'large':
        return {
          fontSize: designTokens.typography.fontSize['2xl'],
          fontWeight: designTokens.typography.fontWeight.bold,
        };
      default:
        return {
          fontSize: designTokens.typography.fontSize.lg,
          fontWeight: designTokens.typography.fontWeight.bold,
        };
    }
  };

  const formattedAmount = formatCurrency(amount, currency);
  const displayText = showSign ? `${type === 'income' ? '+' : '-'}${formattedAmount}` : formattedAmount;

  return (
    <Typography
      variant={variant}
      sx={{
        color: getColor(),
        whiteSpace: 'nowrap',
        fontFamily: designTokens.typography.fontFamily.primary,
        ...getSizeStyles(),
        ...sx,
      }}
      {...props}
    >
      {displayText}
    </Typography>
  );
};
