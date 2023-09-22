import Hero from '@/_components/Hero';
import PostsGrid from '@/_components/blog/PostsGrid';
import { getAllPosts } from '@/_helpers/post';

export default async function Home() {
  const posts = getAllPosts();

  return (
    <section>
      <Hero />
      <PostsGrid posts={posts} />
    </section>
  );
}
