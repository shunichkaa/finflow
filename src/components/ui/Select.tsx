import React from 'react';
import { FormControl, Select as MUISelect, SelectProps } from '@mui/material';
import { colors } from '../../styles/colors';

export const Select: React.FC<SelectProps> = ({ sx, ...props }) => {
  return (
    <FormControl fullWidth size="small" sx={{ ...sx }}>
      <MUISelect
        {...props}
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          '& fieldset': { borderColor: colors.border.medium },
          '&:hover fieldset': { borderColor: colors.primary },
          '&.Mui-focused fieldset': { borderColor: colors.primary },
        }}
      />
    </FormControl>
  );
};


