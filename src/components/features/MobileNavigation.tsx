import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';


interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    badge?: number;
}

interface MobileNavigationProps {
    activeItem?: string;
    onItemClick?: (itemId: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
                                                                      activeItem,
                                                                      onItemClick
                                                                  }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navItems: NavItem[] = [
        {
            id: 'dashboard',
            label: 'Главная',
            icon: '■',
            path: '/'
        },
        {
            id: 'transactions',
            label: 'Транзакции',
            icon: '▪',
            path: '/transactions',
            badge: 3
        },
        {
            id: 'add',
            label: 'Добавить',
            icon: '+',
            path: '/add'
        },
        {
            id: 'budgets',
            label: 'Бюджеты',
            icon: '●',
            path: '/budgets'
        },
        {
            id: 'profile',
            label: 'Профиль',
            icon: '◆',
            path: '/profile'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleNavClick = (item: NavItem) => {
        onItemClick?.(item.id);
        navigate(item.path);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s ease',
                display: { xs: 'block', md: 'none' },
                backdropFilter: 'blur(10px)',
                backgroundColor: '#F8FAFCF2',
                borderTop: '1px solid #94A3B833',
                padding: '8px 0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    maxWidth: 500,
                    margin: '0 auto',
                }}
            >
                {navItems.map((item) => (
                    <Box
                        key={item.id}
                        component="button"
                        onClick={() => handleNavClick(item)}
                        aria-label={item.label}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '8px 12px',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            minWidth: 60,
                            borderRadius: '12px',
                            transition: 'all 0.2s ease',
                            color: activeItem === item.id ? '#6C6FF9' : '#272B3E',
                            '&:active': {
                                backgroundColor: '#0EA5E91A',
                                transform: 'scale(0.95)',
                            },
                            '&:hover': {
                                backgroundColor: '#0EA5E90D',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '20px',
                                marginBottom: '4px',
                                minHeight: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                        >
                            {item.icon}
                            {item.badge && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -4,
                                        right: -8,
                                        backgroundColor: '#FFB3BA',
                                        color: 'white',
                                        borderRadius: '10px',
                                        minWidth: 18,
                                        height: 18,
                                        fontSize: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 4px',
                                    }}
                                >
                                    {item.badge}
                                </Box>
                            )}
                        </Box>
                        <Box
                            sx={{
                                fontSize: { xs: '10px', sm: '12px' },
                                fontWeight: 500,
                            }}
                        >
                            {item.label}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

