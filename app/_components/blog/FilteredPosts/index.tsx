'use client';
import { Meta, Tag } from '@/_type/post';
import { useEffect, useState } from 'react';
import PostsGrid from '@/_components/blog/PostsGrid';
import Category from '@/_components/blog/FilteredPosts/Category';
import Tags from '@/_components/blog/FilteredPosts/Tags';
import { useSearchParams } from 'next/navigation';

interface Props {
  posts: Meta[];
}

function FilteredPosts({ posts }: Props) {
  const searchParams = useSearchParams();
  const searchTag = searchParams.get('tag');

  const [currentCategory, setCurrentCategory] = useState('All');
  const decodedCategory = decodeURIComponent(currentCategory);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (searchTag) {
      setSelectedTags([searchTag]);
    }
  }, []);

  const isSelected = (tag: string) => selectedTags.includes(tag);

  const tags: Tag = {};
  posts
    .filter((meta) => {
      if (currentCategory === 'All') return true;
      return meta.category === decodedCategory;
    })
    .forEach((meta) => {
      meta.tags.forEach((tag) => {
        tags[tag] = tags[tag] + 1 || 1;
      });
    });

  const categorizedPosts = posts.filter((meta) => {
    if (selectedTags.every((tag) => meta.tags.includes(tag))) {
      if (currentCategory === 'All') return true;
      return meta.category === decodedCategory;
    }
  });

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
    setSelectedTags([]);
  };

  const handleTagClick = (tag: string) => {
    if (isSelected(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <>
      <div>
        <div className='flex flex-col justify-center items-center'>
          <span className='text-5xl font-semibold mb-2'>{decodedCategory}</span>
          <span className='font-medium'>{categorizedPosts.length} posts</span>
        </div>
        <Category currentCategory={currentCategory} onClick={handleCategoryClick} />
      </div>
      <div className='relative'>
        <div className='mx-auto max-w-4xl'>
          <PostsGrid posts={categorizedPosts} />
        </div>
        <div className='hidden xl:block fixed right-[max(1rem,calc((100%-896px)/2-208px-2.5rem))] top-80 w-52'>
          <Tags tags={tags} isSelected={isSelected} onClick={handleTagClick} />
        </div>
      </div>
    </>
  );
}

export default FilteredPosts;
