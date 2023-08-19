import Hero from '@/_components/Hero';
import PostsGrid from '@/_components/post/PostsGrid';
import { getAllPosts } from '@/_helpers/post';

export default async function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <PostsGrid posts={posts} />
    </>
  );
}
