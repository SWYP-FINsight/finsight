import { ApiResponse } from '@/features/common/types';
import {
  AddCollectionResponse,
  CollectionArticlesResponse,
  CollectionDetailResponse,
  CollectionsResponse,
  IAddCollection,
  ICollectionArticlesParams,
  IUpdateCollection,
} from '@/features/my-collection/types';
import { http } from '@/lib/http';

export const getCollections = async (): Promise<CollectionsResponse> => {
  return http.getData<CollectionsResponse>(`/collections`);
};

export const getCollectionDetail = async (id: number): Promise<CollectionDetailResponse> => {
  return http.getData<CollectionDetailResponse>(`/collections/${id}`);
};

export const getCollectionArticle = async (params: ICollectionArticlesParams): Promise<CollectionArticlesResponse> => {
  const searchParams = new URLSearchParams();

  // undefined 값 제외하고 추가
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'collectionId') return;

    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return http.getData<CollectionArticlesResponse>(`/collections/${params.collectionId}/articles?${searchParams}`);
};

export const addCollection = async (data: IAddCollection) => {
  return http.postData<AddCollectionResponse>(`/collections`, data);
};

export const deleteCollection = async (id: number) => {
  return http.deleteData<ApiResponse>(`/collections/${id}`);
};

export const updateCollection = async ({ id, data }: IUpdateCollection) => {
  return http.putData<ApiResponse>(`/collections/${id}`, data);
};
