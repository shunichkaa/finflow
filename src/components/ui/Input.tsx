import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full flex flex-col">
            {label && (
                <label className="block text-sm md:text-base text-[#272B3E] mb-2 ml-2 font-medium">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full
                    bg-white
                    rounded-[16px] md:rounded-[20px]
                    px-4 md:px-5 py-3 md:py-4
                    text-sm md:text-base
                    text-[#272B3E]
                    placeholder:text-[#272B3E]
                    border-none
                    outline-none
                    transition-all duration-300
                    shadow-[inset_-3px_-3px_8px_rgba(255,255,255,0.5),inset_3px_3px_8px_rgba(174,174,192,0.5)]
                    focus:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.6),inset_4px_4px_10px_rgba(174,174,192,0.6),0_0_0_3px_rgba(108,111,249,0.15)]
                    ${className}
                `.trim().replace(/\s+/g, ' ')}
                {...props}
            />
            {error && (
                <span className="text-sm text-[#F88ABO] mt-2 ml-2">{error}</span>
            )}
        </div>
    );
};