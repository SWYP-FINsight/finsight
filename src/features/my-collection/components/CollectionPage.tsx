'use client';

import { useAuthMe } from '@/features/auth/hooks';
import Header from '@/features/my-collection/components/Collection.Header';
import CollectionList from '@/features/my-collection/components/CollectionList';
import CollectionLoggedOut from '@/features/my-collection/components/CollectionLoggedOut';
import Loading from '@/shared/ui/loading/Loading';

export default function CollectionPage() {
  const { data: response, isLoading } = useAuthMe();
  const isLoggedIn = response?.data?.loggedIn === true;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <CollectionList /> : <CollectionLoggedOut />}
    </>
  );
}
