'use client';
import { Post } from '@/_type/post';
import { useState } from 'react';
import PostsGrid from '@/_components/blog/PostsGrid';
import Category from '@/_components/blog/FilteredPosts/Category';
import Tags from '@/_components/blog/FilteredPosts/Tags';

interface Props {
  posts: Post[];
}

function FilteredPosts({ posts }: Props) {
  const [currentCategory, setCurrentCategory] = useState('All');
  const decodedCategory = decodeURIComponent(currentCategory);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const isSelected = (tag: string) => selectedTags.includes(tag);

  const allTag = posts
    .filter((post) => {
      if (currentCategory === 'All') return true;
      return post.category === decodedCategory;
    })
    .map((post) => post.tags)
    .reduce((acc, cur) => [...acc, ...cur], []);

  const tags = [...new Set(allTag)].sort();

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
          <span className='text-5xl font-semibold border-b-2 border-neutral-900 pb-2 mb-2'>
            {decodedCategory}
          </span>
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
