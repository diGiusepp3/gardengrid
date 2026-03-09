import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '@/utils/cn';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <View
      className={cn('bg-white rounded-2xl p-4 shadow-sm border border-black/5', className)}
      {...props}
    >
      {children}
    </View>
  );
};
