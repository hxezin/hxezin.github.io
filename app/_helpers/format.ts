export function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
