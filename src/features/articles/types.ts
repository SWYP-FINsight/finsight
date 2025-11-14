import { ApiResponse } from '@/features/common/types';

export interface IArticles {
  id: number;
  title: string;
  subject: string;
  distributor: string;
  timestamp: string;
}

export interface IArticlesParams {
  subject?: string;
  keyword?: string;
  period?: string;
  exdistributor?: string;
  // default: 0
  page?: number;
  // default: 20
  size?: number;
}

export interface IArticleDetail extends IArticles {
  content: string;
  reporter: string;
  source: string;
  importance?: number;
  keyword: string;
}

export interface ArticlesResponse extends ApiResponse {
  data: {
    content: IArticles[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
  };
}

export interface ArticleDetailResponse extends ApiResponse {
  data: IArticleDetail;
}
