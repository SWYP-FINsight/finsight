'use client';

import { useArticleFilters } from '../hooks';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import SearchInput from '@/shared/ui/input/SearchInput';
import React, { ChangeEvent } from 'react';

export default function SearchSection() {
  const { search, updateFilters } = useArticleFilters();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
    console.log(e.target.value);
  };

  return (
    <div className="flex items-center p-[1.6rem] gap-4">
      <ArrowLeftIcon width={24} height={24} />
      <SearchInput onChange={handleChange} />
    </div>
  );
}
