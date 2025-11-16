import CollectionPage from '@/features/my-collection/components/CollectionPage';
import { Suspense } from 'react';

export default function MyCollection() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionPage />
      </Suspense>
    </div>
  );
}
