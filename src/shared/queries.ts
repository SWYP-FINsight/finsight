import { IArticlesParams } from '@/features/articles/types';
import { ICollectionArticlesParams } from '@/features/my-collection/types';

export const QueryKeys = {
  articles: {
    all: ['/api/articles'] as const,
    detail: (id: number) => [`/api/articles/${id}`] as const,

    infinite: (params: IArticlesParams) => [...QueryKeys.articles.all, 'infinite', params ?? {}] as const,
  },
  collections: {
    all: ['/api/collections'] as const,
    detail: (id: number) => [`/api/collections/${id}`] as const,
    article: [`/api/collections/articles`] as const,

    infiniteArticle: (params: ICollectionArticlesParams) =>
      [...QueryKeys.collections.article, 'infinite', params ?? {}] as const,
  },
} as const;
