import fs from 'fs';
import path from 'path';
import { sync } from 'glob';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import readingTime from 'reading-time';

const POSTS_PATH = path.join(process.cwd(), 'posts');

export function getPostFiles() {
  const files = sync(`${POSTS_PATH}/**/*.md`);
  return files.map((file) => {
    const path = file.split('/');
    return {
      year: path.at(-2) || '',
      slug: path.at(-1)!.replace(/\.md$/, '') || '',
    };
  });
}

export function getPostData(year: string, slug: string) {
  const postSlug = [year, slug].join('/');

  const filePath = path.join(POSTS_PATH, `${postSlug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);
  const { title, description, date, category, tags } = data;

  const postData = {
    slug: postSlug,
    title,
    description,
    date,
    category,
    tags,
    content: content,
    readingTime: Math.ceil(readingTime(content).minutes),
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostFiles();

  const allPosts = postFiles.map((file) => {
    const { year, slug } = file;

    return getPostData(year, slug);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}
