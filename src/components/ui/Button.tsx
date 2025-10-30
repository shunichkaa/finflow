import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface Props extends Omit<ButtonProps, 'color' | 'variant'> {
  variant?: Variant;
}

export const Button: React.FC<Props> = ({ variant = 'primary', sx, ...props }) => {
  const variants: Record<Variant, any> = {
    primary: {
      background: colors.primary,
      color: '#FFFFFF',
      '&:hover': { background: colors.primary },
    },
    secondary: {
      background: '#FFFFFF',
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      '&:hover': { background: '#EFF0F6' },
    },
    danger: {
      background: colors.danger,
      color: '#FFFFFF',
      '&:hover': { background: colors.danger },
    },
    ghost: {
      background: 'transparent',
      color: colors.text.primary,
      '&:hover': { background: '#EFF0F6' },
    },
  };

  return (
    <MUIButton
      {...props}
      sx={{
        textTransform: 'none',
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.semibold,
        borderRadius: '8px',
        px: 2.5,
        py: 1,
        ...variants[variant],
        ...sx,
      }}
    />
  );
};