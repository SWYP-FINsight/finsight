'use client';

import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps {
  items: string[];
  label: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({ items, label = '레이블', defaultValue, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue || items[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
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
        <div className={cn('transform transition-transform duration-200', isOpen ? 'rotate-180' : 'rotate-0')}>
          <ArrowDownIcon width={8} height={4} />
        </div>
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute top-full mt-1',
            'min-w-[70px]',
            'bg-gray50 shadow-lg',
            'z-10',
            'border border-gray300 rounded-lg',
          )}
          role="listbox"
        >
          {items.map((item) => (
            <li
              key={item}
              className={cn(
                'px-3 py-2.5 text-sm cursor-pointer',
                'hover:bg-gray100 rounded-lg',
                selectedItem === item ? 'text-brand500 font-medium' : 'text-gray500',
              )}
              onClick={() => handleSelect(item)}
              role="option"
              aria-selected={selectedItem === item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
