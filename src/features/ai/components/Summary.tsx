'use client';

import { postAiSummary, postAiSummaryArticle } from '../api';
import AiSummaryIcon from '@/assets/icons/ai-summary.svg';
import { cn } from '@/lib/utils';
import Spinner from '@/shared/ui/spinner/Spinner';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface AiSummaryProps {
  title?: string;
  size: 'sm' | 'md';
  ids?: number[];
}

export default function AiSummary({ title, size, ids }: AiSummaryProps) {
  const { id } = useParams();
  const [aiContent, setAiContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const iconSize = size === 'md' ? 24 : 14;
  const spinnerSize = size === 'md' ? 22 : 16;

  useEffect(() => {
    const fetchAiSummary = async () => {
      if (ids && ids.length > 0) {
        try {
          const response = await postAiSummary({ articleIds: ids });
          setAiContent(response?.data?.summarize || '요약된 내용이 없습니다.');
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching AI summaries:', error);
          setAiContent('요약된 내용을 불러오는 중 오류가 발생했습니다.');
        }
        return;
      }

      if (id) {
        try {
          const response = await postAiSummaryArticle({ articleId: Number(id) });
          setAiContent(response?.data?.summarize || '요약된 내용이 없습니다.');
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching AI summary:', error);
          setAiContent('요약된 내용을 불러오는 중 오류가 발생했습니다.');
        }
      }
    };

    fetchAiSummary();
  }, []);

  return (
    <div
      className={cn(
        `rounded-[1.2rem] bg-white px-[1.4rem] py-[1.2rem] border-2 border-transparent bg-[linear-gradient(white,white),linear-gradient(90deg,#3ED4E0_0%,#1D7EF8_100%)] bg-origin-border [background-clip:padding-box,border-box]`,
      )}
    >
      <div className="flex items-center gap-2 mb-[0.6rem]">
        <AiSummaryIcon width={iconSize} height={iconSize} className="text-[#1D7EF8]" />
        <span
          className={cn(
            size === 'md' ? 'text-[1.8rem]' : 'text-[1.4rem]',
            `font-bold bg-gradient-to-r from-[#3ED4E0] to-[#1D7EF8] bg-clip-text text-transparent`,
          )}
        >
          {title}
        </span>
        {isLoading && <Spinner size={spinnerSize} />}
      </div>
      <p className={cn(size === 'md' ? 'text-[1.4rem]' : 'text-[1.2rem]', 'text-gray900 font-normal text-left')}>
        {aiContent || ''}
      </p>
    </div>
  );
}
