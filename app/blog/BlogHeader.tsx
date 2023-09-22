import Category from '@/blog/Category';

interface Props {
  currentCategory: string;
  postCount: number;
}

function BlogHeader({ currentCategory, postCount }: Props) {
  const decodedCategory = decodeURIComponent(currentCategory);

  return (
    <header className='flex flex-col justify-center items-center pb-8'>
      <span className='text-5xl font-semibold border-b-2 border-neutral-900 pb-2 mb-2'>
        {decodedCategory}
      </span>
      <span className='pb-8 font-medium'>{postCount} posts</span>
      <Category />
    </header>
  );
}

export default BlogHeader;
