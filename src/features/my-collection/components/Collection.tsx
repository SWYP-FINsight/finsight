'use client';

import CollectionMenuIcon from '@/assets/icons/collection-menu.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import DropDown from '@/features/articles/components/DropDown';
import CollectionArticleList from '@/features/my-collection/components/Collection.ArticleList';
import { ICollections } from '@/features/my-collection/types';
import { useDeleteModalStore } from '@/shared/store/useDeleteModalStore';
import React from 'react';

interface Props {
  data: ICollections;
}

export default function Collection({ data }: Props) {
  const openDeleteModal = useDeleteModalStore((state) => state.open);

  const handleDropdownChange = () => {
    openDeleteModal(data.id);
  };

  if (!data) return;

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <p className="text-[1.8rem] font-bold">{data?.collectionName ?? ''}</p>

        <DropDown<string>
          items={['삭제']}
          defaultValue=""
          onChange={handleDropdownChange}
          label={<CollectionMenuIcon width={24} height={24} />}
          itemToKey={(item) => item}
          itemToLabel={(item) => item}
          icon={<TrashIcon width={16} height={16} />}
        />
      </div>
      <CollectionArticleList collectionId={data?.id ?? 1} />
    </div>
  );
}
