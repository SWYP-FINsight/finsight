'use client';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CollectionMenuIcon from '@/assets/icons/collection-menu.svg';
import PencilIcon from '@/assets/icons/pencil.svg';
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
          <ArrowLeftIcon width={18} height={18} onClick={() => router.push('/my-collection')} />
          <p className="text-[2.0rem] font-bold">{data?.collectionName || ''}</p>
        </div>
        <DropDown<{ label: string; icon: React.ReactNode }>
          items={[
            {
              label: '수정',
              icon: <PencilIcon width={16} height={16} />,
            },
            {
              label: '삭제',
              icon: <TrashIcon width={16} height={16} />,
            },
          ]}
          onChange={handleDropdownChange}
          label={<CollectionMenuIcon width={24} height={24} />}
          itemToKey={(item) => item.label}
          itemToLabel={(item) => item.label}
        />
      </div>

      <CollectionArticleList collectionId={Number(id)} />
    </div>
  );
}
