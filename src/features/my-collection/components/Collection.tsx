'use client';
import CollectionMenuIcon from '@/assets/icons/collection-menu.svg';
import DropDown from '@/features/articles/components/DropDown';
import CollectionArticleList from '@/features/my-collection/components/Collection.ArticleList';
import { ICollections } from '@/features/my-collection/types';
import React from 'react';

interface Props {
  data: ICollections;
}

export default function Collection({ data }: Props) {
  if (!data) return;

  return (
    <div className="w-full p-[1.6rem] flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <p className="text-[1.8rem] font-bold">{data?.collectionName ?? ''}</p>

        <DropDown<string>
          items={['삭제']}
          defaultValue=""
          // TODO: 삭제 기능 구현
          onChange={() => {}}
          label={<CollectionMenuIcon width={24} height={24} />}
          itemToKey={(item) => item}
          itemToLabel={(item) => item}
        />
      </div>
      <CollectionArticleList collectionId={data?.id ?? 1} />
    </div>
  );
}
