import { apiClient, HttpError } from '@/lib/apiClient';

type RequestOptions = Omit<RequestInit, 'method' | 'body'>;

/**
 * GET 요청을 위한 헬퍼 함수
 * @param endpoint - API 엔드포인트
 * @param options - 'cache', 'next' 등 fetch 옵션
 */
async function getData<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, {
    method: 'GET',
    ...options,
  });
}

/**
 * POST 요청을 위한 헬퍼 함수
 * @param endpoint - API 엔드포인트
 * @param body - 요청 본문 (JSON 객체)
 * @param options - 'cache', 'next' 등 fetch 옵션
 */
async function postData<T>(
  endpoint: string,
  body: unknown, // body는 객체, 배열 등 무엇이든 될 수 있음
  options?: RequestOptions,
): Promise<T> {
  return apiClient<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body), // apiClient가 JSON 헤더를 설정하므로 문자열화
    ...options,
  });
}

/**
 * PUT 요청을 위한 헬퍼 함수
 * @param endpoint - API 엔드포인트
 * @param body - 요청 본문 (JSON 객체)
 * @param options - 'cache', 'next' 등 fetch 옵션
 */
async function putData<T>(
  endpoint: string,
  body: unknown,
  options?: RequestOptions,
): Promise<T> {
  return apiClient<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });
}

/**
 * DELETE 요청을 위한 헬퍼 함수
 * @param endpoint - API 엔드포인트
 * @param options - 'cache', 'next' 등 fetch 옵션
 */
async function deleteData<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
}

export const http = {
  getData,
  postData,
  putData,
  deleteData
};

// HttpError도 같이 내보내서 사용하기 편하게 합니다.
export { HttpError };
