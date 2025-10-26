import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { designTokens } from '../../Budgets/theme/designTokens';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface TextProps extends Omit<TypographyProps, 'color'> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body1',
  color = 'primary',
  weight = 'normal',
  children,
  sx,
  ...props 
}) => {
  const { mode } = useThemeMode();

  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return mode === 'dark' ? designTokens.colors.dark.text : designTokens.colors.light.text;
      case 'secondary':
        return mode === 'dark' ? designTokens.colors.dark.textSecondary : designTokens.colors.light.textSecondary;
      case 'success':
        return designTokens.colors.success.main;
      case 'error':
        return designTokens.colors.error.main;
      case 'warning':
        return designTokens.colors.warning.main;
      case 'info':
        return designTokens.colors.info.main;
      case 'inherit':
        return 'inherit';
      default:
        return mode === 'dark' ? designTokens.colors.dark.text : designTokens.colors.light.text;
    }
  };

  const getFontWeight = () => {
    return designTokens.typography.fontWeight[weight];
  };

  return (
    <Typography
      variant={variant}
      sx={{
        color: getColorValue(),
        fontWeight: getFontWeight(),
        fontFamily: designTokens.typography.fontFamily.primary,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};