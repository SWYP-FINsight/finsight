import SearchIcon from '@/assets/icons/search.svg';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'lg';
}

export default function SearchInput({ inputSize = 'sm', ...rest }: Props) {
  return (
    <div
      className={cn('flex items-center p-[1rem] h-[3.8rem] gap-[0.8rem] border-gray-50 rounded-[0.8rem] bg-gray-50', {
        'w-[30.9rem]': inputSize === 'sm',
        'w-[34.3rem]': inputSize === 'lg',
      })}
    >
      <SearchIcon width="1.6rem" height="1.6rem" />
      <input
        className="w-full text-[1.4rem] font-regular text-gray-500 focus:outline-none focus:placeholder:text-transparent"
        placeholder="검색"
        type="text"
        {...rest}
      />
    </div>
  );
}
