import { IArticlesParams } from '@/features/articles/types';

export const QueryKeys = {
  articles: {
    all: ['/api/articles'] as const,
    detail: (id: number) => [`/api/articles/${id}`] as const,

    infinite: (params: IArticlesParams) => [...QueryKeys.articles.all, 'infinite', params ?? {}] as const,
  },
} as const;
