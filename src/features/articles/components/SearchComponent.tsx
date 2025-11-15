'use client';

import SearchInput from '@/shared/ui/input/SearchInput';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SearchComponent() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/search');
  };
  return (
    <div className="w-full p-[1.6rem]">
      <SearchInput onClick={handleClick} inputSize={'lg'} />
    </div>
  );
}
