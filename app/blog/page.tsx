import { getAllPosts } from '@/_helpers/post';
import FilteredPosts from '@/_components/blog/FilteredPosts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
};

function Blog() {
  const posts = getAllPosts();

  return (
    <section>
      <FilteredPosts posts={posts} />
    </section>
  );
}

export default Blog;
