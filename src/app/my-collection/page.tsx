import Header from '@/features/my-collection/components/Collection.Header';
import CollectionList from '@/features/my-collection/components/CollectionList';
import { Suspense } from 'react';

export default function MyCollection() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <CollectionList />
      </Suspense>
    </div>
  );
}
