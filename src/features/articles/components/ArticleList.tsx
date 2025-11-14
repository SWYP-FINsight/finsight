'use client';

import NoSearchIcon from '@/assets/icons/no-search.svg';
import Card from '@/features/articles/components/Card';
import { useArticleFilters, useArticles } from '@/features/articles/hooks';
import { getDateBeforeDays } from '@/shared/utils';
import React, { useEffect, useRef } from 'react';

function getDateBeforePeriod(period: string | null) {
  if (!period) return getDateBeforeDays(0);

  return getDateBeforeDays(period === 'day' ? 0 : period === 'week' ? 7 : period === 'month' ? 30 : 0);
}
export default function ArticleList() {
  const { period, search } = useArticleFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticles({
    pageSize: 10,
    period: getDateBeforePeriod(period) || undefined,
    search: search || undefined,
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

  // render
  // 데이터가 없는 경우
  if (data && data.pages.flatMap.length === 0) {
    return (
      <div className="w-full h-full p-[1.6rem] flex flex-col items-center justify-center gap-4">
        <NoSearchIcon width={140} height={140} />
        <p className="color-gray900 font-bold text-lg">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-[1.6rem]">
      {/* 데이터 렌더링 */}
      <div className="flex flex-col gap-4">
        {data?.pages
          .flatMap((page) => page.data.content)
          .map((item) => (
            <Card key={item.id} data={item} />
          ))}
      </div>

      <div ref={observerRef} style={{ height: '20px' }} />

      {isFetchingNextPage && <div>더 불러오는 중...</div>}
    </div>
  );
}
