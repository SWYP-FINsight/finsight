import { getArticleById, getArticles } from '@/features/articles/api';
import { IArticlesParams } from '@/features/articles/types';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryKeys } from '@/shared/queries';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface UseInfiniteArticlesOptions extends IArticlesParams {
  pageSize?: number;
  initialCursor?: string;
  options?: Parameters<typeof useInfiniteQuery>[0];
}

export const useArticles = ({
  pageSize = 20,
  period,
  search,
  initialCursor,
  ...options
}: UseInfiniteArticlesOptions) => {
  return useInfiniteQuery({
    queryKey: QueryKeys.articles.infinite({ size: pageSize, period, search }),
    queryFn: ({ pageParam }) =>
      getArticles({
        cursor: pageParam, // cursor 기반으로 변경
        size: pageSize,
        period,
        search,
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

export const useArticleFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname === '/' ? '' : pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return {
    period: searchParams.get('period'),
    search: searchParams.get('search'),
    updateFilters,
  };
};
