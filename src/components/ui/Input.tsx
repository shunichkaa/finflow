import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

export const Input: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          '& fieldset': { borderColor: colors.border.medium },
          '&:hover fieldset': { borderColor: colors.primary },
          '&.Mui-focused fieldset': { borderColor: colors.primary },
        },
        '& .MuiInputBase-input': {
          fontFamily: typography.fontFamily.primary,
          fontSize: typography.fontSize.base,
        },
        ...sx,
      }}
    />
  );
};