import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  upperCase?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'contained',
  disabled = false,
  icon,
  fullWidth = false,
  upperCase = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:border-disabled disabled:bg-disabled flex items-center justify-center gap-2 rounded-lg bg-primary p-3 font-medium transition-opacity duration-200 disabled:text-white ${
        variant === 'contained'
          ? 'bg-primary text-white'
          : 'border-2 border-primary bg-white text-primary'
      } ${!disabled ? 'hover:opacity-70' : ''} ${
        fullWidth ? 'w-full' : 'min-w-[64px]'
      } ${upperCase ? 'uppercase' : ''}`}
      {...rest}
    >
      {children} {icon}
    </button>
  );
};