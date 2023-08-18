import TagList from '@/_components/tag/TagList';
import { Post } from '@/_type/post';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  const { title, image, excerpt, date, slug, keyword } = post;

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className='border-b'>
      <Link href={linkPath} className='flex gap-7 py-7'>
        <div className='flex flex-col md:w-full justify-center'>
          <div className='group'>
            <h3 className='font-bold w-fit group-hover:shadow-[inset_0_-12px_0_#F0ABFC]'>
              {title}
            </h3>
            <p className='leading-5 line-clamp-2 text-zinc-600 mt-2 mb-4'>
              {excerpt}
            </p>
          </div>
          <div className='flex items-center'>
            <time className='text-sm text-zinc-400 mr-3'>{formattedDate}</time>
            <TagList tags={keyword} />
          </div>
        </div>
        <div className='hidden md:flex md:w-1/3 md:h-28'>
          <Image
            src={imagePath}
            alt={title}
            width={200}
            height={100}
            className='w-full h-full object-cover'
            priority
          />
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
