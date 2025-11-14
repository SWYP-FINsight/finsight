export class HttpError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message); // 'Error' 클래스의 생성자 호출
    this.name = 'HttpError';
    this.status = status;
    this.message = message;
  }
}

export const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = '';

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },

    credentials: 'include',
  };

  // API 요청
  const response = await fetch(`${baseUrl}${endpoint}`, mergedOptions);

  if (!response.ok) {
    let errorMessage = 'An unknown error occurred';
    let errorStatus = response.status;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }

    throw new HttpError(errorStatus, errorMessage);
  }

  try {
    if (response.status === 204) {
      return null as T;
    }
    return (await response.json()) as T;
  } catch (e) {
    console.error('Failed to parse JSON response:', e);
    throw new HttpError(500, 'Failed to parse server response');
  }
};
