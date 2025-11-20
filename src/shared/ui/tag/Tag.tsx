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
        'inline-flex items-center justify-center rounded-[0.8rem]',
        size === 'small' ? 'h-[2rem] py-[0.4rem] px-[0.6rem]' : 'h-[2.4rem] py-[0.4rem] px-[0.6rem]',
        'bg-gray100 text-gray700',
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
