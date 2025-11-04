'use client';

import { useArticleDetail } from '@/features/articles/hooks';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Articles() {
  const { id } = useParams();
  const { data, isLoading } = useArticleDetail(id as string);

  if (!id || typeof id !== 'string') {
    return <div>Invalid article ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <div>{data.content}</div>;
}
