import { getAllPosts } from '@/_helpers/post';
import FilteredPosts from '@/blog/FilteredPosts';

function Blog() {
  const posts = getAllPosts();

  return (
    <section>
      <FilteredPosts posts={posts} />
    </section>
  );
}

export default Blog;
