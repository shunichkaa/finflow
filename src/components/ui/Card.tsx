import React from 'react';
import { Card as MUICard, CardProps } from '@mui/material';
import { colors } from '../../styles/colors';

export const Card: React.FC<CardProps> = ({ sx, ...props }) => {
  return (
    <MUICard
      {...props}
      sx={{
        borderRadius: 2,
        backgroundColor: colors.background.primary,
        border: `1px solid ${colors.border.light}`,
        boxShadow: '0 1px 3px #00000014',
        ...sx,
      }}
    />
  );
};

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
          backgroundColor: isDark ? '#272B3ECC' : '#FFFFFFCC',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDark ? '#FFFFFF1A' : '#272B3E1A'}`,
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