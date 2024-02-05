import Contact from '@/_components/home/Contact';
import Hero from '@/_components/home/Hero';
import RecentPosts from '@/_components/home/RecentPosts';
import Skill from '@/_components/home/Skill';
import { getResentPosts } from '@/_helpers/post';

export default async function Home() {
  const recentPosts = await getResentPosts();

  return (
    <section>
      <Hero />
      <Contact />
      <Skill />
      <RecentPosts posts={recentPosts} />
    </section>
  );
}
