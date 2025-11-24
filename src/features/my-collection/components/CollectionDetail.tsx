'use client';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CollectionMenuIcon from '@/assets/icons/collection-menu.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import DropDown from '@/features/articles/components/DropDown';
import CollectionArticleList from '@/features/my-collection/components/Collection.ArticleList';
import { useCollectionDetail } from '@/features/my-collection/hooks';
import { useDeleteModalStore } from '@/shared/store/useDeleteModalStore';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

export default function CollectionDetail() {
  const { id } = useParams();
  const { data } = useCollectionDetail(Number(id));
  const router = useRouter();
  const openDeleteModal = useDeleteModalStore((state) => state.open);

  const handleDropdownChange = () => {
    openDeleteModal(Number(id));
  };

  if (!data) return;

  return (
    <div className="p-[1.6rem]">
      <div className="flex justify-between items-center  pb-[1.8rem] gap-4">
        <div className="flex gap-[0.8rem] items-center">
          <ArrowLeftIcon width={18} height={18} onClick={() => router.push('/')} />
          <p className="text-[2.0rem] font-bold">{data?.collectionName || ''}</p>
        </div>
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

      <CollectionArticleList collectionId={Number(id)} />
    </div>
  );
}
