'use client';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { useArticleDetail } from '@/features/articles/hooks';
import { formatDate } from '@/shared/utils';
import { useParams } from 'next/navigation';
import React from 'react';

export default function ArticleDetail() {
  const { id } = useParams();
  const { data, isLoading } = useArticleDetail(Number(id));
  const { title, content, source, timestamp, articleUrl } = data || {};
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="px-4 py-5 cursor-pointer" onClick={() => window.history.back()}>
        <ArrowLeftIcon width={24} height={24} />
      </div>
      <div className="bg-gray50 p-4 text-center space-y-5">
        <div className="text-xl font-bold">{title}</div>
        <div className="space-x-2">
          <span>{formatDate(timestamp ?? '')}</span>
          <span className="mx-2">
            <span className="bg-gay500">• {source}</span>
          </span>
          <a
            className="px-3 py-1 rounded-full border bg-gray50 border-gray300"
            href={'https://' + articleUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            기사원문
          </a>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}
