import React from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { colors } from '../../styles/colors';

export const Toggle: React.FC<SwitchProps> = (props) => {
  return (
    <Switch
      {...props}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: colors.primary,
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: colors.primary,
        },
      }}
    />
  );
};


