import Hero from '@/_components/Hero';
import PostsGrid from '@/_components/post/PostsGrid';

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting started with NextJS',
    image: 'getting-started-with-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR. s a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2023-08-10',
    keyword: ['JavaScript'],
  },
  {
    slug: 'getting-started-with-nextjs2',
    title: 'Getting started with NextJS',
    image: 'getting-started-with-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2023-08-10',
    keyword: ['JavaScript'],
  },
  {
    slug: 'getting-started-with-nextjs3',
    title: 'Getting started with NextJS',
    image: 'getting-started-with-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2023-08-10',
    keyword: ['React', 'NextJS'],
  },
  {
    slug: 'getting-started-with-nextjs4',
    title: 'Getting started with NextJS',
    image: 'getting-started-with-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2023-08-10',
    keyword: ['React', 'NextJS'],
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <PostsGrid posts={DUMMY_POSTS} />
    </>
  );
}
