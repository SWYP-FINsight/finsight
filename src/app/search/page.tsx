import ArticleList from '@/features/articles/components/ArticleList';
import SearchSection from '@/features/articles/components/SearchSection';
import React from 'react';

export default function Search() {
  return (
    <div>
      <SearchSection />
      <ArticleList />
    </div>
  );
}
