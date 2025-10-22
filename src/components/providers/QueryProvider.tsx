"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';

function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: 5 * 1000, // (선택 사항) 5초간 데이터를 'fresh' 상태로 유지
            refetchOnWindowFocus: false, // (선택 사항) 창 포커스 시 자동 리페치 비활성화
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === "development"} />
    </QueryClientProvider>
  );
}

export default QueryProvider;