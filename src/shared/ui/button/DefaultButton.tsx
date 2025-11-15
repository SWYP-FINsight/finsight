import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: 'brand500' | 'gray50';
  textColor: 'gray-50' | 'gray-500';
  onClick?: () => void;
}

export default function DefaultButton({ text, textColor, color, onClick, className, ...rest }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-[8rem] h-[3rem] py-[0.9rem] px-[2.4rem] justify-center items-center gap-[1rem] shrink-0 rounded-[0.8rem]',
        `bg-${color}`,
        `text-${textColor}`,
        { 'border border-gray-300': color === 'gray50' },
        'cursor-pointer',
        className,
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
