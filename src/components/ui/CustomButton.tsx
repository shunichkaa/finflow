import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { designTokens } from '../../Budgets/theme/designTokens';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  children,
  sx,
  ...props 
}) => {
  const { mode } = useThemeMode();

  const getVariantStyles = () => {
    const isDark = mode === 'dark';
    
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: designTokens.colors.primary.main,
          color: '#FFFFFF',
          border: `1px solid ${designTokens.colors.primary.main}`,
          '&:hover': {
            backgroundColor: designTokens.colors.primary.dark,
            borderColor: designTokens.colors.primary.dark,
          },
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: isDark ? designTokens.colors.dark.text : designTokens.colors.light.text,
          border: `1px solid ${isDark ? designTokens.colors.dark.border : designTokens.colors.light.border}`,
          '&:hover': {
            backgroundColor: designTokens.colors.primary.hover,
            borderColor: designTokens.colors.primary.main,
          },
        };
      case 'success':
        return {
          backgroundColor: designTokens.colors.success.main,
          color: '#FFFFFF',
          border: `1px solid ${designTokens.colors.success.main}`,
          '&:hover': {
            backgroundColor: designTokens.colors.success.dark,
            borderColor: designTokens.colors.success.dark,
          },
        };
      case 'error':
        return {
          backgroundColor: designTokens.colors.error.main,
          color: '#FFFFFF',
          border: `1px solid ${designTokens.colors.error.main}`,
          '&:hover': {
            backgroundColor: designTokens.colors.error.dark,
            borderColor: designTokens.colors.error.dark,
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: isDark ? designTokens.colors.dark.text : designTokens.colors.light.text,
          border: 'none',
          '&:hover': {
            backgroundColor: designTokens.colors.primary.hover,
          },
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
          fontSize: designTokens.typography.fontSize.sm,
          minHeight: '32px',
        };
      case 'large':
        return {
          padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
          fontSize: designTokens.typography.fontSize.lg,
          minHeight: '48px',
        };
      default:
        return {
          padding: `${designTokens.spacing.sm} ${designTokens.spacing.lg}`,
          fontSize: designTokens.typography.fontSize.base,
          minHeight: '40px',
        };
    }
  };

  return (
    <Button
      sx={{
        borderRadius: designTokens.borderRadius.md,
        fontWeight: designTokens.typography.fontWeight.medium,
        textTransform: 'none',
        transition: designTokens.transitions.normal,
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};