'use client';
import { Post } from '@/_type/post';
import { useState } from 'react';
import PostsGrid from '@/_components/blog/PostsGrid';
import Category from '@/blog/Category';

interface Props {
  posts: Post[];
}

function CategoryList({ posts }: Props) {
  const [currentCategory, setCurrentCategory] = useState('All');
  const decodedCategory = decodeURIComponent(currentCategory);

  const categorizedPosts =
    currentCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === decodedCategory);

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <>
      <header className='flex flex-col justify-center items-center'>
        <span className='text-5xl font-semibold border-b-2 border-neutral-900 pb-2 mb-2'>
          {decodedCategory}
        </span>
        <span className='font-medium'>{categorizedPosts.length} posts</span>
      </header>
      <Category
        currentCategory={currentCategory}
        onClick={handleCategoryClick}
      />
      <PostsGrid posts={categorizedPosts} />
    </>
  );
}

export default CategoryList;
