'use client';

import MvpButton from '@/shared/ui/button/MvpButton';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  isPending?: boolean;
}

export default function DeleteCollectionModal({ isOpen, onClose, onConfirm, isPending, ...rest }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative flex flex-col items-center gap-[1.6rem] w-[28.9rem] bg-gray-100
        py-[2rem] px-[1.6rem] rounded-[2rem]"
        {...rest}
      >
        <h3 className="text-[1.4rem] font-bold text-gray-900">컬렉션을 삭제하시겠습니까?</h3>

        <div className="flex w-full gap-[0.9rem]">
          <MvpButton className="w-full bg-gray-50 text-gray-900" onClick={onClose} disabled={isPending}>
            취소
          </MvpButton>
          <MvpButton className="w-full bg-brand500 text-gray-50" onClick={onConfirm} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </MvpButton>
        </div>
      </div>
    </div>
  );
}
