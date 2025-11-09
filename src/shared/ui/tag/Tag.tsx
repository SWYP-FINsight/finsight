import { cn } from '@/lib/utils';
import React, { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: 'small' | 'large';
}

export default function Tag({ children, size = 'small', ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg',
        size === 'small' ? 'h-5 py-1 px-1.5' : 'h-6 py-1 px-1.5',
        'bg-gray100 text-gray700',
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
