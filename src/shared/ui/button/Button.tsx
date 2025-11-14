import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonSize: 'sm' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ text, buttonSize, onClick, disabled, className, ...rest }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[4.2rem] items-center justify-center rounded-[0.8rem] text-center text-[1.4rem] font-medium cursor-pointer tracking-tighter',
        {
          'bg-brand500 text-gray-50': !disabled,
          'bg-gray-300 text-gray-500': disabled,
        },
        {
          'w-[26.8rem]': buttonSize === 'lg',
          'w-[6.8rem]': buttonSize === 'sm',
        },
        className,
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
