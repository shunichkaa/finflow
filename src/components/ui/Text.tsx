import React from 'react';

interface TextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption';
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({ 
    children, 
    variant = 'body', 
    className = '',
    as 
}) => {
    const styles = {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-bold text-[#272B3E] leading-tight tracking-tight',
        h2: 'text-xl md:text-2xl lg:text-3xl font-semibold text-[#272B3E] leading-tight',
        h3: 'text-lg md:text-xl lg:text-2xl font-semibold text-[#272B3E] leading-snug',
        body: 'text-sm md:text-base lg:text-lg text-[#272B3E] leading-relaxed',
        small: 'text-xs md:text-sm text-[#8F9BB3] leading-relaxed',
        caption: 'text-xs text-[#8F9BB3] leading-normal'
    };

    const Component = as || (variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' : 'p');

    return (
        <Component className={`${styles[variant]} ${className}`.trim()}>
            {children}
        </Component>
    );
};


