export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export interface Meta extends Frontmatter {
  slug: string;
  readingTime: number;
}

export type Content = string;

export interface Post {
  meta: Meta;
  content: Content;
}

export interface Tag {
  [key: string]: number;
}
