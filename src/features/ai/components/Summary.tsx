'use client';

import { postAiSummaryArticle } from '../api';
import AiSummaryIcon from '@/assets/icons/ai-summary.svg';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AiSummary() {
  const { id } = useParams();
  const [aiContent, setAiContent] = useState('');

  useEffect(() => {
    const fetchAiSummary = async () => {
      if (id) {
        try {
          const response = await postAiSummaryArticle({ articleId: Number(id) });
          setAiContent(response?.data?.summarize || '요약된 내용이 없습니다.');
        } catch (error) {
          console.error('Error fetching AI summary:', error);
          setAiContent('요약된 내용을 불러오는 중 오류가 발생했습니다.');
        }
      }
    };
    fetchAiSummary();
  }, [id]);

  return (
    <div
      className="rounded-[1.2rem] bg-white px-[1.4rem] py-[1.2rem] border-2 border-transparent
  bg-[linear-gradient(white,white),linear-gradient(90deg,#3ED4E0_0%,#1D7EF8_100%)]
  bg-origin-border
  [background-clip:padding-box,border-box]"
    >
      <div className="flex items-center gap-2 mb-[0.6rem]">
        <AiSummaryIcon width={24} height={24} className="text-[#1D7EF8]" />
        <span className="font-bold text-[1.8rem] bg-gradient-to-r from-[#3ED4E0] to-[#1D7EF8] bg-clip-text text-transparent">
          뉴스 AI 요약
        </span>
      </div>
      <p className="text-[1.4rem] text-gray900 font-normal text-left">{aiContent || ''}</p>
    </div>
  );
}
