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
        <div className='flex flex-col items-center justify-center'>
          <span className='mb-2 text-5xl font-semibold'>{decodedCategory}</span>
          <span className='font-medium'>{categorizedPosts.length} posts</span>
        </div>
        <Category currentCategory={currentCategory} onClick={handleCategoryClick} />
      </div>
      <div className='relative flex justify-center gap-10'>
        <div className='mx-auto max-w-4xl flex-1'>
          <PostsGrid posts={categorizedPosts} />
        </div>
        <div className='hidden w-52 shrink-0 xl:block'>
          <div className='sticky top-24'>
            <Tags tags={tags} isSelected={isSelected} onClick={handleTagClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FilteredPosts;
