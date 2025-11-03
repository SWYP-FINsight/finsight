import { ArticlesResponse, IArticlesParams } from '@/features/articles/types';
import { http } from '@/lib/http';

export const getArticles = async (params: IArticlesParams): Promise<ArticlesResponse> => {
  const searchParams = new URLSearchParams();

  // undefined 값 제외하고 추가
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return http.getData<ArticlesResponse>(`/finsight/articles?${searchParams}`);
};
