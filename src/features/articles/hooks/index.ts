import { getArticleById, getArticles } from '@/features/articles/api';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryKeys } from '@/shared/queries';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface UseInfiniteArticlesOptions {
  pageSize?: number;
  initialCursor?: string;
  options?: Parameters<typeof useInfiniteQuery>[0];
}

export const useArticles = ({ pageSize = 20, initialCursor, ...options }: UseInfiniteArticlesOptions) => {
  return useInfiniteQuery({
    queryKey: QueryKeys.articles.infinite({ size: pageSize }),
    queryFn: ({ pageParam }) =>
      getArticles({
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

export const useArticleDetail = (id?: number) => {
  return useQuery({
    queryKey: QueryKeys.articles.detail(id as number),
    queryFn: () => getArticleById(id as number).then((res) => res.data),
    enabled: !!id && typeof id === 'number',
    staleTime: QUERY_STALE_TIME,
  });
};
