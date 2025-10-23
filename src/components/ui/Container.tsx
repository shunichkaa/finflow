import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({ 
    children, 
    className = '', 
    size = 'lg' 
}) => {
    const sizes = {
        sm: 'max-w-2xl',   // 672px
        md: 'max-w-4xl',   // 896px
        lg: 'max-w-6xl',   // 1152px
        full: 'max-w-7xl'  // 1280px
    };

    return (
        <div className={`
            w-full 
            ${sizes[size]}
            mx-auto 
            px-4 md:px-6 lg:px-8
            ${className}
        `.trim().replace(/\s+/g, ' ')}>
            {children}
        </div>
    );
};


