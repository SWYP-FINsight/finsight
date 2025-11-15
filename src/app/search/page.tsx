import SearchSection from '@/features/articles/components/SearchSection';
import React, { Suspense } from 'react';

export default function Search() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchSection />
      </Suspense>
    </div>
  );
}
