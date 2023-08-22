import { getAllPosts } from '@/_helpers/post';
import PostsGrid from '@/_components/post/PostsGrid';

function Blog() {
  const posts = getAllPosts();

  return (
    <section>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default Blog;
