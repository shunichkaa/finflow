import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { designTokens } from '../../Budgets/theme/designTokens';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface CardProps extends BoxProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  padding = 'medium',
  children,
  sx,
  ...props 
}) => {
  const { mode } = useThemeMode();

  const getVariantStyles = () => {
    const isDark = mode === 'dark';
    
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: isDark ? designTokens.colors.dark.surface : designTokens.colors.light.surface,
          boxShadow: isDark ? designTokens.shadows.lg : designTokens.shadows.md,
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: isDark ? designTokens.colors.dark.surface : designTokens.colors.light.surface,
          border: `1px solid ${isDark ? designTokens.colors.dark.border : designTokens.colors.light.border}`,
          boxShadow: 'none',
        };
      case 'glass':
        return {
          backgroundColor: isDark ? 'rgba(39, 43, 62, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)'}`,
          boxShadow: isDark ? designTokens.shadows.glow : designTokens.shadows.lg,
        };
      default:
        return {
          backgroundColor: isDark ? designTokens.colors.dark.surface : designTokens.colors.light.surface,
          border: `1px solid ${isDark ? designTokens.colors.dark.border : designTokens.colors.light.border}`,
          boxShadow: isDark ? designTokens.shadows.sm : 'none',
        };
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: designTokens.spacing.sm };
      case 'large':
        return { padding: designTokens.spacing.xl };
      default:
        return { padding: designTokens.spacing.lg };
    }
  };

  return (
    <Box
      sx={{
        borderRadius: designTokens.borderRadius.lg,
        transition: designTokens.transitions.normal,
        ...getVariantStyles(),
        ...getPaddingStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};