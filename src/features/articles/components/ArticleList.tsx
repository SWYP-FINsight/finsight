'use client';

import Card from './Card';
import { useArticleFilters, useArticles } from '@/features/articles/hooks';
import { getDateBeforeDays } from '@/shared/utils';
import React, { useEffect, useRef } from 'react';

function getDateBeforePeriod(period: string | null) {
  if (!period) return getDateBeforeDays(0);

  return getDateBeforeDays(period === 'day' ? 1 : period === 'week' ? 7 : period === 'month' ? 30 : 0);
}
export default function ArticleList() {
  const { period, keyword } = useArticleFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticles({
    pageSize: 10,
    period: getDateBeforePeriod(period) || undefined,
  });
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full p-[1.6rem]">
      {/* 데이터 렌더링 */}
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-col gap-4">
          {data?.pages
            .flatMap((page) => page.data.content)
            .map((item) => (
              <Card key={item.id} data={item} />
            ))}
        </div>
      ))}

      <div ref={observerRef} style={{ height: '20px' }} />

      {isFetchingNextPage && <div>더 불러오는 중...</div>}
    </div>
  );
}
