import PostItem from '@/_components/post/PostItem';
import { Post } from '@/_type/post';

interface Props {
  posts: Post[];
}

function PostsGrid({ posts }: Props) {
  return (
    <ul className='grid grid-cols-1 content-center gap-7'>
      {posts.map((post, index) => (
        <>
          <PostItem key={post.slug} post={post} />
          {posts.length - 1 !== index && (
            <div className='border-t border-neutral-200'></div>
          )}
        </>
      ))}
    </ul>
  );
}

export default PostsGrid;
