import MvpChipButton from '@/shared/ui/button/MvpChipButton';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  groupType: 'source' | 'period';
  value?: string;
  onValueChange?: (value: string) => void;
}

const sourceOptions = [
  { label: '연합뉴스', value: '연합뉴스' },
  { label: '한국경제', value: '한국경제' },
];
const periodOptions = [
  { label: '오늘', value: 'TODAY' },
  { label: '7일이내', value: 'LAST_7_DAYS' },
  { label: '30일이내', value: 'LAST_30_DAYS' },
];

export default function ChipGroup({ title, groupType, value, onValueChange }: Props) {
  const handleClick = (nameValue: string) => {
    onValueChange?.(nameValue);
  };

  return (
    <div className="inline-flex flex-col items-start gap-[0.6rem] shrink-0">
      {title && <h3 className="items-stretch text-[1.4rem] font-medium text-gray-900">{title}</h3>}
      <div className="flex flex-col gap-[0.6rem] items-start">
        {groupType === 'source' && (
          <div className="flex items-center gap-[0.8rem]">
            {sourceOptions.map((option) => (
              <MvpChipButton
                key={option.value}
                title={option.label}
                onClick={() => handleClick(option.value)}
                isActive={value === option.value}
              />
            ))}
          </div>
        )}
        {groupType === 'period' && (
          <div className="flex items-center gap-[0.8rem]">
            {periodOptions.map((option) => (
              <MvpChipButton
                key={option.value}
                title={option.label}
                size="sm"
                onClick={() => handleClick(option.value)}
                isActive={value === option.value}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
