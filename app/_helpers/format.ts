export function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function createHeadingId(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}
