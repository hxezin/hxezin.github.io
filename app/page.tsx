import Contact from '@/_components/home/Contact';
import Hero from '@/_components/home/Hero';
import RecentPosts from '@/_components/home/RecentPosts';
import Skill from '@/_components/home/Skill';
import { getAllPosts } from '@/_helpers/post';

export default async function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <section>
      <Hero />
      <Contact />
      <Skill />
      <RecentPosts posts={recentPosts} />
    </section>
  );
}
