import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
    children, 
    className = '', 
    padding = 'md',
    onClick 
}) => {
    const paddings = {
        sm: 'p-4 md:p-5',
        md: 'p-5 md:p-6 lg:p-8',
        lg: 'p-6 md:p-8 lg:p-10'
    };

    return (
        <div 
            className={`
                bg-white
                rounded-[24px] md:rounded-[32px]
                shadow-[-15px_-15px_30px_rgba(255,255,255,0.8),15px_15px_30px_rgba(174,174,192,0.4)]
                transition-all duration-300
                hover:shadow-[-18px_-18px_36px_rgba(255,255,255,0.9),18px_18px_36px_rgba(174,174,192,0.5)]
                hover:translate-y-[-2px]
                ${paddings[padding]}
                ${onClick ? 'cursor-pointer' : ''}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
            onClick={onClick}
        >
            {children}
        </div>
    );
};


