import { getAllPosts } from '@/_helpers/post';
import PostsGrid from '@/_components/post/PostsGrid';

function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <PostsGrid posts={posts} />
    </>
  );
}

export default Blog;
