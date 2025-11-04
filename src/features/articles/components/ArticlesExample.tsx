'use client';

import { useArticleDetail } from '../hooks';
import { useParams } from 'next/navigation';
import React from 'react';

function Articles() {
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

export default Articles;
