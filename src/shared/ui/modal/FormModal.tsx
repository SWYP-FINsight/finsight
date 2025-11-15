import BackIcon from '@/assets/icons/arrow-left.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  onBack?: () => void;
}

export default function FormModal({ isOpen, onClose, title, onBack, children, className, ...rest }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className={cn('relative flex flex-col w-[30rem] rounded-[2rem] bg-gray-100 py-[2rem] px-[1.6rem]', className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...rest}
      >
        <div className="flex flex-col gap-[1.8rem]">
          <div className="relative flex justify-center items-center">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="absolute flex justify-start items-center w-[2.4rem] h-[2.4rem] left-0 cursor-pointer"
              >
                <BackIcon width="1.4rem" height="1.4rem" />
              </button>
            )}
            {title && <h2 className="text-center text-18 font-bold text-gray-900">{title}</h2>}
            <button
              type="button"
              onClick={onClose}
              className="absolute flex justify-end items-center w-[2.4rem] h-[2.4rem] right-0 cursor-pointer"
            >
              <CloseIcon width="1rem" height="1rem" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
