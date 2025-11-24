import { ApiResponse } from '@/features/common/types';

export interface AiSummaryRequest {
  articleIds: number[];
}

export interface AiSummaryResponse extends ApiResponse {
  data: { summarize: string };
}

export interface AiSummaryArticleRequest {
  articleId: number;
}
