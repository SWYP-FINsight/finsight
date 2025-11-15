import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelTitle?: string;
  inputSize?: 'sm' | 'lg';
  isSuccess?: boolean;
  isFailed?: boolean;
  messageText?: string;
}

export default function LabelInput({ labelTitle, inputSize = 'lg', isSuccess, isFailed, messageText, ...rest }: Props) {
  return (
    <div className="inline-flex flex-col items-start gap-[0.6rem] shrink-0">
      {labelTitle && <h3 className="items-stretch text-[1.4rem] font-medium text-gray-900">{labelTitle}</h3>}
      <div>
        <input
          className={cn(
            'border border-solid rounded-[0.8rem] h-[4.2rem] p-[1.2rem] items-center bg-gray-50',
            'text-[1.4rem] font-regular focus:outline-none focus:placeholder:text-transparent placeholder-gray-300',

            isSuccess && 'border-brand500',
            isFailed && 'border-red-500',
            !isSuccess && !isFailed && 'border-gray-300',
            {
              'w-[19.2rem]': inputSize === 'sm',
              'w-[26.8rem]': inputSize === 'lg',
            },
          )}
          placeholder="입력"
          type="text"
          {...rest}
        />
      </div>
      {(isSuccess || isFailed) && messageText && (
        <h4 className={cn('text-[1rem] font-regular', isSuccess && 'text-brand500', isFailed && 'text-red-500')}>
          {messageText}
        </h4>
      )}
    </div>
  );
}
