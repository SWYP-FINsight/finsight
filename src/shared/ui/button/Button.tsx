import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ children, onClick, disabled, className, ...rest }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[4.2rem] items-center justify-center rounded-[0.8rem] text-center text-[1.4rem] font-medium cursor-pointer tracking-tighter',
        'w-[26.8rem]',
        {
          'bg-brand500 text-gray-50': !disabled,
          'bg-gray-300 text-gray-500': disabled,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
