import MvpChipButton from '@/shared/ui/button/MvpChipButton';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  size?: 'lg' | 'sm';
  groupType: 'source' | 'period';
}

export default function ChipGroup({ title, size = 'lg', groupType }: Props) {
  return (
    <div className="inline-flex flex-col items-start gap-[0.6rem] shrink-0">
      {title && <h3 className="items-stretch text-[1.4rem] font-medium text-gray-900">{title}</h3>}
      <div className="flex flex-col gap-[0.6rem] items-start">
        {groupType === 'source' && (
          <div className="flex items-center gap-[0.8rem]">
            <MvpChipButton title="연합뉴스" />
            <MvpChipButton title="한국경제" />
          </div>
        )}
        {groupType === 'period' && (
          <div className="flex items-center gap-[0.8rem]">
            <MvpChipButton title="오늘" size="sm" />
            <MvpChipButton title="7일이내" size="sm" />
            <MvpChipButton title="30일이내" size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}
