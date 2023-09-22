import PostItem from '@/_components/blog/PostItem';
import { Post } from '@/_type/post';

interface Props {
  posts: Post[];
}

function PostsGrid({ posts }: Props) {
  return (
    <ul className='grid grid-cols-1 content-center gap-7'>
      {posts.map((post, index) => (
        <>
          {index === 0 && <div className='border-t border-neutral-200'></div>}
          <PostItem key={post.slug} post={post} />
          {<div className='border-t border-neutral-200'></div>}
        </>
      ))}
    </ul>
  );
}

export default PostsGrid;
