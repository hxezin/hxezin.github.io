export interface PostMatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export interface Post extends PostMatter {
  slug: string;
  content: string;
  readingTime: number;
}

export interface Tag {
  [key: string]: number;
}
