import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function MvpButton({ children, onClick, className, ...rest }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-[13rem] h-[4.2rem] justify-center items-center rounded-[0.8rem] ',
        'text-center text-gray-50 text-[1.4rem] font-medium cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
