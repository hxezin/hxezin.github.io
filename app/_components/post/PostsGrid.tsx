import PostItem from '@/_components/post/PostItem';
import { Post } from '@/_type/post';

interface Props {
  posts: Post[];
}

function PostsGrid({ posts }: Props) {
  return (
    <ul className='grid grid-cols-1 content-center'>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
