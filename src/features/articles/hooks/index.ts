import { getArticleById, getArticles } from '@/features/articles/api';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryKeys } from '@/shared/queries';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface UseInfiniteArticlesOptions {
  pageSize?: number;
  pageParam?: number;
  options?: Parameters<typeof useInfiniteQuery>[0];
}

export const useArticles = ({ pageSize = 20, pageParam, ...options }: UseInfiniteArticlesOptions = {}) => {
  return useInfiniteQuery({
    queryKey: QueryKeys.articles.infinite({ page: pageSize, size: pageParam }),

    queryFn: ({ pageParam }) =>
      getArticles({
        page: pageParam, // pageNumber → page 변환
        size: pageSize, // pageSize → size 변환
      }),

    getNextPageParam: (lastPage) => {
      // 응답의 pageNumber 사용
      const currentPage = lastPage.data.pageNumber;
      const totalPages = lastPage.data.totalPage;

      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },

    initialPageParam: pageParam,
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
