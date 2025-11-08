import PlusIcon from '@/assets/icons/plus.svg';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
}

export default function TextButton({ text, onClick, ...rest }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[5.7rem] h-[2.8rem] py-[0.6rem] px-[1rem] items-center cursor-pointer bg-brand500 rounded-full text-gray-50 text-[1.2rem] font-[600]"
      {...rest}
    >
      <PlusIcon width="1.6rem" height="1.6rem" />
      {text}
    </button>
  );
}
