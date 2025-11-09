import { IArticleDetail } from '@/features/articles/types';
import { cn } from '@/lib/utils';
import Tag from '@/shared/ui/tag/Tag';
import React from 'react';

interface Props {
  className?: string;
  data: IArticleDetail;
}

export default function Card({ className, data }: Props) {
  const { title, content, source, timestamp } = data;
  return (
    <div className={cn('relative', 'bg-gray50 rounded-lg', 'p-2.5 border border-gray100', 'space-y-3', className)}>
      {/* 내용 */}
      <div className="flex gap-1.5 flex-col">
        <div className="text-gray900 text-[1.4rem] font-bold line-clamp-2">{title}</div>
        <p className="text-gray-800 text-[1.2rem] leading-relaxed whitespace-pre-wrap font-normal">{content}</p>
      </div>

      {/* 하단 정보 */}
      <div className="flex flex-row justify-between text-[1rem] text-gray-500 pt-2">
        <div>{new Date(timestamp).getFullYear() + new Date(timestamp).getMonth() + new Date(timestamp).getDay()}</div>
        <Tag size="large">{source}</Tag>
      </div>
    </div>
  );
}
