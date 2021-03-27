import {ButtonHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary' | 'light' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
  isFullWidth?: boolean;
};

const buttonColors = {
  primary: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
  secondary:
    'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-blue-300',
  light: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-indigo-500',
  danger: 'text-gray-600 bg-pink-100 hover:bg-pink-200 focus:ring-pink-300',
};

export const Button: React.FC<ButtonProps> = ({
  color = 'primary',
  type = 'button',
  size = 'md',
  isFullWidth = false,
  className = '',
  children,
  disabled,
  ...rest
}) => {
  const colorClasses = buttonColors[color];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthClass = isFullWidth ? 'w-full' : '';
  const sizeClasses =
    size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-base';

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${colorClasses} ${disabledClasses} ${widthClass} ${sizeClasses} flex justify-center items-center font-medium border border-transparent rounded-md shadow-sm focus:outline-none  focus:ring-2 focus:ring-offset-2 ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
