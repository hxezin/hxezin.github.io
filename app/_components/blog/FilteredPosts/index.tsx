'use client';
import { Post, Tag } from '@/_type/post';
import { useEffect, useState } from 'react';
import PostsGrid from '@/_components/blog/PostsGrid';
import Category from '@/_components/blog/FilteredPosts/Category';
import Tags from '@/_components/blog/FilteredPosts/Tags';
import { useSearchParams } from 'next/navigation';

interface Props {
  posts: Post[];
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
    .filter((post) => {
      if (currentCategory === 'All') return true;
      return post.category === decodedCategory;
    })
    .forEach((post) => {
      post.tags.forEach((tag) => {
        tags[tag] = tags[tag] + 1 || 1;
      });
    });

  const categorizedPosts = posts.filter((post) => {
    if (selectedTags.every((tag) => post.tags.includes(tag))) {
      if (currentCategory === 'All') return true;
      return post.category === decodedCategory;
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
        <Category
          currentCategory={currentCategory}
          onClick={handleCategoryClick}
        />
      </div>
      <div className='flex gap-14'>
        <PostsGrid posts={categorizedPosts} />
        <Tags tags={tags} isSelected={isSelected} onClick={handleTagClick} />
      </div>
    </>
  );
}

export default FilteredPosts;
