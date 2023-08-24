import { MetadataRoute } from 'next';
import { getAllPosts } from '@/_helpers/post';

const URL = 'https://hxezin.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
  }));

  const allPosts = getAllPosts();
  const postsSiteMap = allPosts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [...routes, ...postsSiteMap];
}
