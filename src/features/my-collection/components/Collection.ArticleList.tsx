'use client';

import Card from '@/features/articles/components/Card';
import { useCollectionArticle } from '@/features/my-collection/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

interface Props {
  collectionId: number;
}

export default function CollectionArticleList({ collectionId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCollectionArticle({
    collectionId,
    pageSize: 10,
  });
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: number) => {
    router.push(`/article/${id}`);
  };

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

  if (!data || data.pages.flatMap((page) => page.data.content).length === 0) {
    return;
  }

  return (
    <div className="h-[40rem] overflow-y-auto">
      {/* 데이터 렌더링 */}
      <div className="flex flex-col gap-4">
        {data?.pages
          .flatMap((page) => page.data.content)
          .map((item) => (
            <Card key={item?.id} className="cursor-pointer" data={item} onClick={() => handleClick(item?.id)} />
          ))}
      </div>

      <div className="h-[2rem]" ref={observerRef} />

      {isFetchingNextPage && <div>더 불러오는 중...</div>}
    </div>
  );
}
