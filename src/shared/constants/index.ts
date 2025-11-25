// 쿼리 관련 상수
export const QUERY_STALE_TIME = 1000 * 60 * 5; // 5분 동안 캐시된 데이터 사용

// OAuth 로그인
export const CLIENT_KAKAO = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
