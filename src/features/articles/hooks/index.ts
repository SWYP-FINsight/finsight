import { getArticles } from '@/features/articles/api';
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
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
