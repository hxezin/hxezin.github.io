export function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

export function createHeadingId(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}
