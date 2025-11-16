import { IArticles } from '@/features/articles/types';
import { ApiResponse } from '@/features/common/types';

export interface ICollections {
  id: number;
  collectionName: string;
}

export interface ICollectionDetail extends ICollections {
  keyword: string;
  periodType: string;
  source: string;
}

export interface ICollectionArticlesParams {
  collectionId: number;
  cursor?: string; // 마지막으로 조회된 가사의 publishedAt 값
  size?: number;
}

export interface CollectionsResponse extends ApiResponse {
  data: {
    collections: ICollections[];
    totalCount: number;
  };
}

export interface CollectionDetailResponse extends ApiResponse {
  data: ICollectionDetail;
}

export interface CollectionArticlesResponse extends ApiResponse {
  data: {
    content: IArticles[];
    nextCursor: string;
    hasNext: boolean;
    size: number;
  };
}
