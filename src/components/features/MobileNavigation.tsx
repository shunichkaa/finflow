import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSwipeGesture } from "../../Budgets/hooks/useSwipeGesture.ts";


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
            icon: '📊',
            path: '/'
        },
        {
            id: 'transactions',
            label: 'Транзакции',
            icon: '💳',
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
            icon: '💰',
            path: '/budgets'
        },
        {
            id: 'profile',
            label: 'Профиль',
            icon: '👤',
            path: '/profile'
        }
    ];

    // Скрываем навигацию при скролле вниз
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
                backgroundColor: 'rgba(248, 250, 252, 0.95)',
                borderTop: '1px solid rgba(148, 163, 184, 0.2)',
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
                            color: activeItem === item.id ? '#0ea5e9' : '#64748b',
                            '&:active': {
                                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                                transform: 'scale(0.95)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(14, 165, 233, 0.05)',
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
                                        backgroundColor: '#ef4444',
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

            {/* Safe area для iPhone */}
            <Box sx={{ height: 'env(safe-area-inset-bottom)' }} />
        </Box>
    );
};

// Компонент для свайпаемого элемента транзакции
export const SwipeableTransactionItem: React.FC<{
    children: React.ReactNode;
    onDelete: () => void;
    onEdit: () => void;
}> = ({ children, onDelete, onEdit }) => {
    const { swipeProps, swipeState } = useSwipeGesture({
        onSwipeLeft: onDelete,
        onSwipeRight: onEdit,
        threshold: 60
    });

    const getTransformX = () => {
        if (swipeState.direction === 'left') {
            return -Math.min(swipeState.distance * 0.3, 80);
        } else if (swipeState.direction === 'right') {
            return Math.min(swipeState.distance * 0.3, 80);
        }
        return 0;
    };

    return (
        <Box
            {...swipeProps}
            sx={{
                position: 'relative',
                transition: 'transform 0.2s ease',
                transform: `translateX(${getTransformX()}px)`,
                '&:active': {
                    backgroundColor: '#f8fafc',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    transition: 'opacity 0.2s ease',
                    backgroundColor: '#ef4444',
                    opacity: swipeState.direction === 'left' ? 0.9 : 0,
                }}
            >
                Удалить
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    transition: 'opacity 0.2s ease',
                    backgroundColor: '#0ea5e9',
                    opacity: swipeState.direction === 'right' ? 0.9 : 0,
                }}
            >
                Редактировать
            </Box>

            {children}
        </Box>
    );
};