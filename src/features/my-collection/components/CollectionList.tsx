'use client';

import AddFolderIcon from '@/assets/icons/add-folder.svg';
import Collection from '@/features/my-collection/components/Collection';
import { useCollections } from '@/features/my-collection/hooks';
import MyCollectionLoading from '@/shared/ui/loading/MyCollectionLoading';
import React from 'react';

export default function CollectionList() {
  const { data, isLoading, isFetching } = useCollections();

  if (isFetching || isLoading) {
    return <MyCollectionLoading />;
  }

  if (data && data.totalCount === 0) {
    return (
      <div className="w-full p-[1.6rem] justify-center items-center flex flex-col gap-[2rem] h-dvh">
        <AddFolderIcon width={70} height={70} />
        <div className="flex flex-col gap-[1.2rem] justify-center items-center">
          <p className="text-[1.8rem] font-bold">마이 컬렉션이 비어 있어요.</p>
          <p className="text-[1.4rem] font-medium">키워드를 추가해서 나만의 뉴스피드를 만들어보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-[1.6rem] flex flex-col gap-[1.6rem]">
      {data?.collections.map((collection) => (
        <Collection key={collection.id} data={collection} />
      ))}
    </div>
  );
}
