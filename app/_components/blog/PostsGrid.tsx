import PostItem from '@/_components/blog/PostItem';
import { Post } from '@/_type/post';
import { Fragment } from 'react';

interface Props {
  posts: Post[];
}

function PostsGrid({ posts }: Props) {
  return (
    <ul className='grid grid-cols-1 content-center gap-7 w-full'>
      {posts.map((post, index) => (
        <Fragment key={post.slug}>
          {index === 0 && <div className='border-t border-neutral-200'></div>}
          <PostItem post={post} />
          {<div className='border-t border-neutral-200'></div>}
        </Fragment>
      ))}
    </ul>
  );
}

export default PostsGrid;
