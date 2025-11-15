import { getCollectionArticle, getCollectionDetail, getCollections } from '@/features/my-collection/api';
import { ICollectionArticlesParams } from '@/features/my-collection/types';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryKeys } from '@/shared/queries';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface UseInfiniteCollectionArticlesOptions extends ICollectionArticlesParams {
  pageSize?: number;
  initialCursor?: string;
  options?: Parameters<typeof useInfiniteQuery>[0];
}

export const useCollectionArticle = ({
  collectionId,
  pageSize = 10,
  initialCursor,
  ...options
}: UseInfiniteCollectionArticlesOptions) => {
  return useInfiniteQuery({
    queryKey: QueryKeys.collections.infiniteArticle({ collectionId, size: pageSize }),
    queryFn: ({ pageParam }) =>
      getCollectionArticle({
        collectionId,
        cursor: pageParam, // cursor 기반으로 변경
        size: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      // cursor 기반 페이지네이션
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: initialCursor,
    staleTime: QUERY_STALE_TIME,
    ...options,
  });
};

export const useCollectionDetail = (id?: number) => {
  return useQuery({
    queryKey: QueryKeys.collections.detail(id as number),
    queryFn: () => getCollectionDetail(id as number).then((res) => res.data),
    enabled: !!id && typeof id === 'number',
    staleTime: QUERY_STALE_TIME,
  });
};

export const useCollections = () => {
  return useQuery({
    queryKey: QueryKeys.collections.all,
    queryFn: () => getCollections().then((res) => res.data),
    staleTime: QUERY_STALE_TIME,
  });
};
