import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useSwipeGesture} from "../../Budgets/hooks/useSwipeGesture.ts";


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
    const router = useRouter();
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
        router.push(item.path);
    };

    return (
        <div className={`mobile-navigation ${isVisible ? 'visible' : 'hidden'}`}>
            <style jsx>{`
                .mobile-navigation {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: white;
                    border-top: 1px solid #e0e0e0;
                    padding: 8px 0;
                    transition: transform 0.3s ease;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.95);
                }

                .mobile-navigation.hidden {
                    transform: translateY(100%);
                }

                .nav-content {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 8px 12px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    position: relative;
                    min-width: 60px;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }

                .nav-item:active {
                    background: rgba(25, 118, 210, 0.1);
                    transform: scale(0.95);
                }

                .nav-item.active {
                    color: #1976d2;
                }

                .nav-icon {
                    font-size: 20px;
                    margin-bottom: 4px;
                    min-height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .nav-label {
                    font-size: 12px;
                    font-weight: 500;
                }

                .badge {
                    position: absolute;
                    top: 4px;
                    right: 8px;
                    background: #f44336;
                    color: white;
                    border-radius: 10px;
                    min-width: 18px;
                    height: 18px;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 4px;
                }

                @media (max-width: 480px) {
                    .nav-label {
                        font-size: 10px;
                    }

                    .nav-item {
                        padding: 8px 8px;
                        min-width: 50px;
                    }
                }
            `}</style>

            <div className="nav-content">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                        onClick={() => handleNavClick(item)}
                        aria-label={item.label}
                    >
                        <div className="nav-icon">
                            {item.icon}
                            {item.badge && <span className="badge">{item.badge}</span>}
                        </div>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Safe area для iPhone */}
            <div style={{ height: 'env(safe-area-inset-bottom)' }} />
        </div>
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

    return (
        <div className="swipeable-item" {...swipeProps}>
            <style jsx>{`
                .swipeable-item {
                    position: relative;
                    transition: transform 0.2s ease;
                    transform: translateX(${swipeState.direction === 'left' ? -Math.min(swipeState.distance * 0.3, 80) :
                            swipeState.direction === 'right' ? Math.min(swipeState.distance * 0.3, 80) : 0}px);
                }

                .swipeable-item:active {
                    background: #f5f5f5;
                }

                .swipe-background {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: opacity 0.2s ease;
                }

                .delete-background {
                    right: 0;
                    background: #f44336;
                    opacity: ${swipeState.direction === 'left' ? 0.9 : 0};
                }

                .edit-background {
                    left: 0;
                    background: #1976d2;
                    opacity: ${swipeState.direction === 'right' ? 0.9 : 0};
                }
            `}</style>

            <div className="swipe-background delete-background">
                Удалить
            </div>

            <div className="swipe-background edit-background">
                Редактировать
            </div>

            {children}
        </div>
    );
};