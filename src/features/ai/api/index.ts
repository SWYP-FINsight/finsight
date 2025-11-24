import { AiSummaryArticleRequest, AiSummaryRequest, AiSummaryResponse } from '../types';
import { http } from '@/lib/http';

// ai/summarize API 추가
// ai/summarize/article API 추가

export const postAiSummary = async (params: AiSummaryRequest) => {
  return http.postData<AiSummaryResponse>(`/ai/summarize`, params);
};

export const postAiSummaryArticle = async (params: AiSummaryArticleRequest) => {
  return http.postData<AiSummaryResponse>(`/ai/summarize/article`, params);
};
