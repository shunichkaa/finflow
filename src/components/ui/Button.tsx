import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    disabled,
    ...props
}) => {
    const baseStyles = `
        transition-all duration-300
        font-medium
        border-none
        cursor-pointer
    `.trim().replace(/\s+/g, ' ');

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const variants = {
        primary: `
            bg-white
            text-[#272B3E]
            rounded-[20px] md:rounded-[24px]
            shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(174,174,192,0.4)]
            hover:shadow-[-12px_-12px_24px_rgba(255,255,255,0.9),12px_12px_24px_rgba(174,174,192,0.5)]
            active:shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.5),inset_5px_5px_10px_rgba(174,174,192,0.5)]
            hover:translate-y-[-1px]
            active:translate-y-0
        `.trim().replace(/\s+/g, ' '),
        secondary: `
            bg-[#F5F6FA]
            text-[#272B3E]
            rounded-[20px] md:rounded-[24px]
            shadow-[-8px_-8px_16px_rgba(255,255,255,0.8),8px_8px_16px_rgba(174,174,192,0.3)]
            hover:shadow-[-10px_-10px_20px_rgba(255,255,255,0.9),10px_10px_20px_rgba(174,174,192,0.4)]
            active:shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.5),inset_5px_5px_10px_rgba(174,174,192,0.5)]
        `.trim().replace(/\s+/g, ' '),
        icon: `
            bg-white
            rounded-[16px]
            shadow-[-8px_-8px_16px_rgba(255,255,255,0.8),8px_8px_16px_rgba(174,174,192,0.3)]
            hover:shadow-[-10px_-10px_20px_rgba(255,255,255,0.9),10px_10px_20px_rgba(174,174,192,0.4)]
            active:shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.5),inset_5px_5px_10px_rgba(174,174,192,0.5)]
            flex items-center justify-center
        `.trim().replace(/\s+/g, ' ')
    };

    const sizes = {
        sm: variant === 'icon' ? 'w-10 h-10' : 'px-4 py-2 text-sm',
        md: variant === 'icon' ? 'w-12 h-12' : 'px-6 md:px-8 py-3 text-sm md:text-base w-full md:w-auto',
        lg: variant === 'icon' ? 'w-14 h-14' : 'px-8 md:px-10 py-4 text-base md:text-lg w-full md:w-auto'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};