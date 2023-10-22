import { MetadataRoute } from 'next';
import { getAllPosts } from '@/_helpers/post';

const URL = 'https://hxezin.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const posts = getAllPosts();
  const blogs = posts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [...routes, ...blogs];
}
