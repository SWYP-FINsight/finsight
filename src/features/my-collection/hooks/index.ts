import { ApiResponse } from '@/features/common/types';
import {
  addCollection,
  deleteCollection,
  getCollectionArticle,
  getCollectionDetail,
  getCollections,
} from '@/features/my-collection/api';
import { AddCollectionResponse, IAddCollection, ICollectionArticlesParams } from '@/features/my-collection/types';
import { HttpError } from '@/lib/apiClient';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryKeys } from '@/shared/queries';
import { useInfiniteQuery, useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';

interface UseInfiniteCollectionArticlesOptions extends ICollectionArticlesParams {
  pageSize?: number;
  initialCursor?: string;
  options?: Parameters<typeof useInfiniteQuery>[0];
}

type AddCollectionMutationOptions = UseMutationOptions<AddCollectionResponse, HttpError, IAddCollection>;
type DeleteCollectionMutationOptions = UseMutationOptions<ApiResponse, HttpError, number>;

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

export const useAddCollectionMutation = (options?: Omit<AddCollectionMutationOptions, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  return useMutation<AddCollectionResponse, HttpError, IAddCollection>({
    mutationFn: addCollection,
    ...options,
    onSuccess: (data, variables, context, ...rest) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.collections.all });

      options?.onSuccess?.(data, variables, context, ...rest);
    },
    onError: (error, ...rest) => {
      options?.onError?.(error, ...rest);
    },
  });
};

export const useDeleteCollectionMutation = (options?: Omit<DeleteCollectionMutationOptions, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, HttpError, number>({
    mutationFn: deleteCollection,
    ...options,
    onSuccess: (data, variables, context, ...rest) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.collections.all });

      options?.onSuccess?.(data, variables, context, ...rest);
    },
    onError: (error, ...rest) => {
      options?.onError?.(error, ...rest);
    },
  });
};
