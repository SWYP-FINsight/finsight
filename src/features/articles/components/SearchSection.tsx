'use client';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import ArticleList from '@/features/articles/components/ArticleList';
import { useArticleFilters } from '@/features/articles/hooks';
import SearchInput from '@/shared/ui/input/SearchInput';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef } from 'react';

export default function SearchSection() {
  const { search, updateFilters } = useArticleFilters();
  const router = useRouter();
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
      <div className="flex items-center p-[1.6rem] pb-[0.4rem] gap-4">
        <ArrowLeftIcon width={9} height={18} onClick={() => router.back()} />
        <SearchInput onChange={handleChange} />
      </div>
      <div className="h-vh">{search && <ArticleList />}</div>
    </>
  );
}
