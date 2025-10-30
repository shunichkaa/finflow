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