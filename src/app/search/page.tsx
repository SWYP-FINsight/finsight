import SearchSection from '@/features/articles/components/SearchSection';
import React, { Suspense } from 'react';

export default function Search() {
  return (
    <div className="h-dvh">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchSection />
      </Suspense>
    </div>
  );
}
