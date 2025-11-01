import { IArticlesParams } from '../types';

export const articleKeys = {
  all: ['/api/articles'] as const,

  infinite: (params: IArticlesParams) => [...articleKeys.all, 'infinite', params ?? {}] as const,
};
