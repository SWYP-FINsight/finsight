import SuccessIcon from '@/assets/icons/check-circle.svg';
import CloseIcon from '@/assets/icons/close.svg';
import ErrorIcon from '@/assets/icons/error-circle.svg';
import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalType?: 'success' | 'error';
}

export default function Modal({ isOpen, onClose, children, modalType, ...rest }: Props) {
  const Icon = modalType === 'success' ? SuccessIcon : ErrorIcon;
  return (
    <div
      className="relative flex flex-col items-center gap-[1.2rem] w-[28.5rem] h-[13.1rem] bg-gray-100
        py-[1.8rem] px-[1.6rem] rounded-[2rem]"
      {...rest}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute flex justify-center items-center w-[2.4rem] h-[2.4rem] top-[1.8rem] right-[1.6rem]"
      >
        <CloseIcon width="1rem" height="1rem" />
      </button>
      {Icon && <Icon className="w-[5rem] h-[5rem]" />}
      <div className="text-gray-900 text-[1.8rem] font-bold text-center">{children}</div>
    </div>
  );
}
