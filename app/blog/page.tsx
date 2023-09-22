import { getAllPosts } from '@/_helpers/post';
import FilteredPosts from '@/_components/blog/FilteredPosts';

function Blog() {
  const posts = getAllPosts();

  return (
    <section>
      <FilteredPosts posts={posts} />
    </section>
  );
}

export default Blog;
