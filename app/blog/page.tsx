import { getAllPostsMeta } from '@/_helpers/post';
import FilteredPosts from '@/_components/blog/FilteredPosts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
};

async function Blog() {
  const posts = await getAllPostsMeta();

  return (
    <section>
      <FilteredPosts posts={posts} />
    </section>
  );
}

export default Blog;
