import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';
import { Meta, Post } from '@/_type/post';
import matter from 'gray-matter';
import { cache } from 'react';

const POSTS_PATH = path.join(process.cwd(), 'posts');

export async function getPostBySlug(year: string, file: string): Promise<Post> {
  const slug = [year, file].join('/').replace(/\.mdx$/, '');
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { data, content } = matter(fileContent);
  const { title, description, date, category, tags } = data;

  const meta = {
    slug,
    title,
    description,
    date,
    category,
    tags,
    readingTime: Math.ceil(readingTime(content).minutes),
  };

  return { meta, content };
}

export const getAllPostsMeta = cache(async (): Promise<Meta[]> => {
  const yearDirectories = fs.readdirSync(POSTS_PATH);

  const posts = await Promise.all(
    yearDirectories.flatMap(async (year) => {
      const yearPath = path.join(POSTS_PATH, year);
      const files = fs.readdirSync(yearPath);

      return await Promise.all(
        files.map(async (file) => {
          const { meta } = await getPostBySlug(year, file);
          return meta;
        })
      );
    })
  );

  const flattenedPosts = posts.flat();

  const sortedPosts = flattenedPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
});

export async function getResentPosts() {
  const allPosts = await getAllPostsMeta();
  return allPosts.slice(0, 5);
}
