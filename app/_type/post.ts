export interface PostMatter {
  title: string;
  description: string;
  date: string;
  keyword: string[];
}

export interface Post extends PostMatter {
  slug: string;
  content: string;
}
