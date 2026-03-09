import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { cn } from '@/utils/cn';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  labelClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  labelClassName,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-earth-600 active:bg-earth-700',
    outline: 'bg-transparent border border-primary-600',
    ghost: 'bg-transparent',
    danger: 'bg-red-600 active:bg-red-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 rounded-lg',
    md: 'px-4 py-2.5 rounded-xl',
    lg: 'px-6 py-4 rounded-2xl',
  };

  const textVariants = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-primary-600 font-semibold',
    ghost: 'text-primary-600 font-semibold',
    danger: 'text-white font-semibold',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      className={cn(
        'flex-row items-center justify-center',
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#16a34a' : '#fff'} />
      ) : (
        <Text className={cn(textVariants[variant], textSizes[size], labelClassName)}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
