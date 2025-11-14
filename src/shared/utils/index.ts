// "2025-11-14T20:21:03" -> 2025.10.27
export function formatDateKorean(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${year}.${month}.${day}`;
}
