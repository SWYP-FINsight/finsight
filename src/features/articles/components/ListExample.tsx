'use client';

import { useArticles } from '@/features/articles/hooks';
import React from 'react';

function ListExample() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticles({ pageParam: 0, pageSize: 2 });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  console.log(data);
  return (
    <div>
      <button onClick={handleLoadMore}>페이지 증가</button>
      {/* 데이터 렌더링 */}
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.content.map((item) => (
            <p key={i + item.id}>{item.title}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ListExample;
