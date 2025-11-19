'use client';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { useArticleDetail } from '@/features/articles/hooks';
import { formatDate } from '@/shared/utils';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

export default function ArticleDetail() {
  const { id } = useParams();
  const { data, isLoading } = useArticleDetail(Number(id));
  const { title, content, source, timestamp, articleUrl } = data || {};
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="px-4 py-5 cursor-pointer" onClick={() => router.back()}>
        <ArrowLeftIcon width={7} height={14} />
      </div>
      <div className="bg-gray50 p-4 text-center">
        <div className="text-[2rem] font-bold mb-[1.6rem] text-gray900">{title}</div>
        <div className="space-x-2 text-[1.2rem] mb-[2rem] text-gray500">
          <span>{formatDate(timestamp ?? '')}</span>
          <span className="mx-2">
            <span className="bg-gay500">• {source}</span>
          </span>
          <Link
            className="h-[1.2rem] px-[1.2rem] py-[0.4rem] rounded-full border bg-gray50 border-gray300 text-[1rem] font-medium"
            href={articleUrl || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            기사원문
          </Link>
        </div>
        <div className="text-[1.4rem] font-regular text-gray900">{content}</div>
      </div>
    </div>
  );
}
