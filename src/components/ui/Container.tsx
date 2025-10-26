import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { designTokens } from '../../Budgets/theme/designTokens';

interface ContainerProps extends BoxProps {
  variant?: 'default' | 'centered' | 'fullWidth';
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ 
  variant = 'default', 
  children, 
  sx, 
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'centered':
        return {
          maxWidth: designTokens.breakpoints.lg,
          margin: '0 auto',
          padding: `0 ${designTokens.spacing.lg}`,
        };
      case 'fullWidth':
        return {
          width: '100%',
          padding: `0 ${designTokens.spacing.md}`,
        };
      default:
        return {
          maxWidth: designTokens.breakpoints.md,
          margin: '0 auto',
          padding: `0 ${designTokens.spacing.md}`,
        };
    }
  };

  return (
    <Box
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};