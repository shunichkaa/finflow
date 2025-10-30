import React from 'react';
import {IconButton, IconButtonProps} from '@mui/material';
import {designTokens} from '../../Budgets/theme/designTokens';
import {useThemeMode} from '../../Budgets/theme/ThemeContext';

interface CustomIconButtonProps extends Omit<IconButtonProps, 'color'> {
    variant?: 'default' | 'primary' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
}

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({
                                                                      variant = 'default',
                                                                      size = 'medium',
                                                                      children,
                                                                      sx,
                                                                      ...props
                                                                  }) => {
    const {mode} = useThemeMode();

    const getVariantStyles = () => {
        const isDark = mode === 'dark';

        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: designTokens.colors.primary.main,
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: designTokens.colors.primary.dark,
                        transform: 'scale(1.05)',
                    },
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    color: isDark ? designTokens.colors.dark.text : designTokens.colors.light.text,
                    '&:hover': {
                        backgroundColor: designTokens.colors.primary.hover,
                        transform: 'scale(1.1)',
                    },
                };
            case 'danger':
                return {
                    backgroundColor: 'transparent',
                    color: isDark ? '#FFFFFFB3' : '#00000099',
                    '&:hover': {
                        backgroundColor: isDark ? '#FFFFFF1A' : '#0000000A',
                        color: isDark ? '#ffffff' : '#000000',
                        transform: 'scale(1.05)',
                    },
                };
            default:
                return {
                    backgroundColor: 'transparent',
                    color: isDark ? designTokens.colors.dark.text : designTokens.colors.light.text,
                    '&:hover': {
                        backgroundColor: isDark ? '#FFFFFF1A' : '#272B3E1A',
                        transform: 'scale(1.1)',
                    },
                };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    minHeight: '32px',
                };
            case 'large':
                return {
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                };
            default:
                return {
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px',
                };
        }
    };

    return (
        <IconButton
            sx={{
                borderRadius: designTokens.borderRadius.full,
                transition: designTokens.transitions.normal,
                ...getVariantStyles(),
                ...getSizeStyles(),
                ...sx,
            }}
            {...props}
        >
            {children}
        </IconButton>
    );
};