import { getAllPostsMeta } from '@/_helpers/post';

const URL = 'https://hxezin.github.io';

export default async function sitemap() {
  const posts = await getAllPostsMeta();

  const routes = ['', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const blogs = posts.map((meta) => ({
    url: `${URL}/blog/${meta.slug}`,
    lastModified: new Date(meta.date).toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
