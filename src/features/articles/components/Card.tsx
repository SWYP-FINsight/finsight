import { IArticles } from '@/features/articles/types';
import { cn } from '@/lib/utils';
import Tag from '@/shared/ui/tag/Tag';
import { formatDate } from '@/shared/utils';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: IArticles;
}

export default function Card({ className, data, ...rest }: Props) {
  const { title, source, content, timestamp } = data;
  return (
    <div
      className={cn(
        'relative',
        'bg-gray50 rounded-[0.8rem]',
        'p-[1rem] border border-gray100',
        'space-y-[1.2rem]',
        className,
      )}
      {...rest}
    >
      {/* 내용 */}
      <div className="flex gap-[0.6rem] flex-col">
        <div className="text-gray900 text-[1.4rem] font-bold line-clamp-2">{title}</div>
        <p className="text-gray700 text-[1.2rem] line-clamp-3 leading-relaxed whitespace-pre-wrap font-normal">
          {content}
        </p>
      </div>

      {/* 하단 정보 */}
      <div className="flex flex-row justify-between text-[1rem] text-gray-500 pt-[0.8rem]">
        <div>{formatDate(timestamp)}</div>
        <Tag size="small">{source}</Tag>
      </div>
    </div>
  );
}
