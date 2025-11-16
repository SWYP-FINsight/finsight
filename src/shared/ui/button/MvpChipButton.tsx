import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: 'lg' | 'sm';
  isActive?: boolean;
  onClick?: () => void;
}

export default function MvpChipButton({ title, size = 'lg', isActive = false, onClick, ...rest }: Props) {
  return (
    <button
      className={cn(
        'flex h-[3.2rem] py-[0.6rem] px-[1.2rem] justify-center items-center rounded-[0.8rem]',
        ' text-gray-700 text-[1.2rem] font-medium cursor-pointer',
        isActive ? 'bg-gray-700 text-gray-50' : 'border border-solid border-gray-300 bg-gray-50',
        {
          'w-[13rem]': size === 'lg',
          'w-[8.4rem]': size === 'sm',
        },
      )}
      {...rest}
    >
      {title}
    </button>
  );
}
