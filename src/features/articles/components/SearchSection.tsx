'use client';

import { useArticleFilters } from '../hooks';
import ArticleList from './ArticleList';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import SearchInput from '@/shared/ui/input/SearchInput';
import React, { ChangeEvent, useEffect, useRef } from 'react';

export default function SearchSection() {
  const { search, updateFilters } = useArticleFilters();
  const debounceRef = useRef<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      updateFilters({ search: value });
      console.log(value);
    }, 300); // 300ms 디바운스
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="flex items-center p-[1.6rem] gap-4">
        <ArrowLeftIcon width={24} height={24} />
        <SearchInput onChange={handleChange} />
      </div>
      {search && <ArticleList />}
    </>
  );
}
