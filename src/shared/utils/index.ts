// "2025-11-14T20:21:03" -> 2025.10.27
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${year}.${month}.${day}`;
}

// 오늘, 7일이내, 30일 이내 날짜 반환
// 오늘 날짜 기준 -7일, -30일 계산 후 반환
export function getDateBeforeDays(days: number): string {
  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - days);

  const year = pastDate.getFullYear();
  const month = pastDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = pastDate.getDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}
