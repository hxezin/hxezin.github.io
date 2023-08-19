import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const { title, image, excerpt, date, keyword } = data;

  const postData = {
    slug: postSlug,
    title,
    image,
    excerpt,
    date,
    keyword,
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}
