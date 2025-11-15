import { ApiResponse } from '@/features/common/types';

export interface IArticles {
  id: number;
  title: string;
  content: string;
  source: string;
  timestamp: string;
}

export interface IArticlesParams {
  cursor?: string; // 마지막으로 조회된 가사의 publishedAt 값
  size?: number;
  search?: string; // 검색어
  period?: string;
  source?: string; // 기사출처 (ex: '연합뉴스' 등)
}

export interface IArticleDetail extends IArticles {
  content: string;
  reporter: string;
  source: string;
  articleUrl?: number;
  importance: string;
}

export interface ArticlesResponse extends ApiResponse {
  data: {
    content: IArticles[];
    nextCursor: string;
    hasNext: boolean;
    size: number;
  };
}

export interface ArticleDetailResponse extends ApiResponse {
  data: IArticleDetail;
}
