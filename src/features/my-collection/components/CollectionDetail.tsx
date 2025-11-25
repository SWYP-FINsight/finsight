'use client';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CollectionMenuIcon from '@/assets/icons/collection-menu.svg';
import PencilIcon from '@/assets/icons/pencil.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import DropDown from '@/features/articles/components/DropDown';
import CollectionArticleList from '@/features/my-collection/components/Collection.ArticleList';
import DeleteCollectionModal from '@/features/my-collection/components/DeleteCollectionModal';
import UpdateCollectionForm from '@/features/my-collection/components/UpdateCollectionForm';
import { useCollectionDetail, useDeleteCollectionMutation } from '@/features/my-collection/hooks';
import { useDeleteModalStore } from '@/shared/store/useDeleteModalStore';
import FormModal from '@/shared/ui/modal/FormModal';
import { useParams, useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';

type CollectionAction = { action: 'update' | 'delete'; label: string; icon: ReactNode };

const collectionActions: CollectionAction[] = [
  {
    action: 'update',
    label: '수정',
    icon: <PencilIcon width={16} height={16} />,
  },
  {
    action: 'delete',
    label: '삭제',
    icon: <TrashIcon width={16} height={16} />,
  },
];

export default function CollectionDetail() {
  const { id } = useParams();
  const { data } = useCollectionDetail(Number(id));
  const router = useRouter();
  const [isUpdateOpenModal, setIsUpdateOpenModal] = useState(false);
  const closeUpdateModal = () => setIsUpdateOpenModal(false);
  const openDeleteModal = useDeleteModalStore((state) => state.open);

  const {
    isOpen: isDeleteModalOpen,
    collectionId: collectionIdToDelete,
    close: closeDeleteModal,
  } = useDeleteModalStore();

  const deleteMutation = useDeleteCollectionMutation({
    onSuccess: () => {
      closeDeleteModal(); // 성공 시 스토어의 close 호출
      router.push('/my-collection');
    },
    onError: () => {
      closeDeleteModal();
    },
  });

  const handleConfirmDelete = () => {
    if (collectionIdToDelete) {
      deleteMutation.mutate(collectionIdToDelete);
    }
  };

  const handleDropdownChange = (dropDownAction: CollectionAction) => {
    if (dropDownAction.action === 'delete') {
      openDeleteModal(Number(id));
    } else if (dropDownAction.action === 'update') {
      setIsUpdateOpenModal(true);
    }
  };

  if (!data) return;

  return (
    <div className="p-[1.6rem]">
      <div className="flex justify-between items-center  pb-[1.8rem] gap-4">
        <div className="flex gap-[0.8rem] items-center">
          <ArrowLeftIcon width={18} height={18} onClick={() => router.push('/my-collection')} />
          <p className="text-[2.0rem] font-bold">{data?.collectionName || ''}</p>
        </div>
        <DropDown<CollectionAction>
          items={collectionActions}
          onChange={handleDropdownChange}
          label={<CollectionMenuIcon width={24} height={24} />}
          itemToKey={(item) => item.label}
          itemToLabel={(item) => item.label}
        />
      </div>

      <CollectionArticleList collectionId={Number(id)} />
      <FormModal title="컬렉션 수정" isOpen={isUpdateOpenModal} onClose={closeUpdateModal}>
        <UpdateCollectionForm initData={data} onUpdateSuccess={closeUpdateModal} />
      </FormModal>
      <DeleteCollectionModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
