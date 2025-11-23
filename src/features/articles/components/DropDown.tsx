'use client';

import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps<T> {
  items: T[];
  label: string | React.ReactNode;
  defaultValue?: T;
  onChange: (value: T) => void;
  className?: string;
  icon?: React.ReactNode;
  /**
   * item 객체에서 React key로 사용할 고유 값을 추출하는 함수
   */
  itemToKey: (item: T) => string | number;
  /**
   * item 객체에서 화면에 표시할 텍스트나 React 노드를 추출하는 함수
   */
  itemToLabel: (item: T) => React.ReactNode;
}

const DropDown = <T,>({
  items,
  label = '레이블',
  defaultValue,
  onChange,
  className,
  itemToKey,
  itemToLabel,
  icon,
}: DropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue || items[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChange(item);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={cn('relative min-w-[70px] justify-items-end', className)} ref={dropdownRef}>
      <button
        type="button"
        className={cn('flex items-center gap-1.5', 'text-sm text-gray500', 'cursor-pointer')}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        {/* label이 string인 경우만 추가 */}
        {label && typeof label === 'string' && (
          <div className={cn('transform transition-transform duration-200', isOpen ? 'rotate-180' : 'rotate-0')}>
            <ArrowDownIcon width={8} height={4} />
          </div>
        )}
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute top-full mt-1',
            'min-w-[70px]',
            'bg-gray50 shadow-lg',
            'z-10',
            'border border-gray300 rounded-[0.8rem]',
          )}
          role="listbox"
        >
          {items.map((item) => {
            // itemToKey, itemToLabel 함수를 사용
            const key = itemToKey(item);
            const displayLabel = itemToLabel(item);

            // 8. 비교 로직 수정 (객체 직접 비교 대신 key 값으로 비교)
            const isSelected = selectedItem && itemToKey(selectedItem) === key;

            return (
              <li
                key={key} // key 적용
                className={cn(
                  'flex flex-col justify-center items-start w-[9.4rem] h-[3.8rem] text-[1.4rem] text-gray-900 cursor-pointer',
                  'hover:bg-gray100 rounded-[0.8rem] border-solid border-gray-300',
                )}
                onClick={() => handleSelect(item)}
                role="option"
                aria-selected={isSelected} // isSelected 적용
              >
                <div className="flex justify-center items-center pl-[1rem] gap-[0.4rem]">
                  {icon}
                  {displayLabel}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
