import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { colors } from '../../styles/colors';

type Variant = 'success' | 'warning' | 'danger' | 'neutral';

interface Props extends Omit<ChipProps, 'color' | 'variant'> {
  variant?: Variant;
}

export const Badge: React.FC<Props> = ({ variant = 'neutral', sx, ...props }) => {
  const mapVariant: Record<Variant, any> = {
    success: { bgcolor: '#10B98126', color: '#10B981' },
    warning: { bgcolor: '#F59E0B26', color: '#F59E0B' },
    danger: { bgcolor: '#EF444426', color: '#EF4444' },
    neutral: { bgcolor: colors.background.tertiary, color: colors.text.secondary },
  };
  return <Chip {...props} sx={{ fontWeight: 600, ...mapVariant[variant], ...sx }} />;
};


