'use client';

import { useAuthMe } from '@/features/auth/hooks';
import AddCollectionForm from '@/features/my-collection/components/AddCollectionForm';
import Header from '@/features/my-collection/components/Collection.Header';
import CollectionList from '@/features/my-collection/components/CollectionList';
import CollectionLoggedOut from '@/features/my-collection/components/CollectionLoggedOut';
import MyCollectionLoading from '@/shared/ui/loading/MyCollectionLoading';
import AlertModal from '@/shared/ui/modal/AlertModal';
import FormModal from '@/shared/ui/modal/FormModal';
import { useState } from 'react';

type ModalType = 'addCollection' | 'success' | null;

export default function CollectionPage() {
  const { data: response, isLoading } = useAuthMe();
  const isLoggedIn = response?.data?.loggedIn === true;

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const openAddModal = () => setActiveModal('addCollection');
  const closeModal = () => setActiveModal(null);

  if (isLoading) {
    return <MyCollectionLoading />;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onAddClick={openAddModal} />
      {isLoggedIn ? <CollectionList /> : <CollectionLoggedOut />}
      <FormModal title="컬렉션 추가" isOpen={activeModal === 'addCollection'} onClose={closeModal}>
        <AddCollectionForm onAddSuccess={() => setActiveModal('success')} />
      </FormModal>
      <AlertModal isOpen={activeModal === 'success'} onClose={closeModal} modalType="success">
        컬렉션이 추가되었습니다.
      </AlertModal>
    </>
  );
}
