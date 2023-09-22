import PostsGrid from '@/_components/blog/PostsGrid';
import { getAllPosts } from '@/_helpers/post';
import BlogHeader from '@/blog/BlogHeader';

function Blog() {
  const posts = getAllPosts();

  return (
    <section>
      <BlogHeader currentCategory='All' postCount={posts.length} />
      <PostsGrid posts={posts} />
    </section>
  );
}

export default Blog;
