import TagList from '@/_components/tag/TagList';
import { formattedDate } from '@/_helpers/format';
import { Post } from '@/_type/post';
import Link from 'next/link';
import { AiOutlineCalendar, AiOutlineFieldTime } from 'react-icons/ai';

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  const { title, description, date, slug, tags, readingTime } = post;

  const linkPath = `/blog/${slug}`;

  return (
    <li>
      <TagList tags={tags} />
      <Link href={linkPath} className='group'>
        <h3 className='font-semibold w-fit group-hover:shadow-[inset_0_-12px_0_#fcd34d] mt-4'>
          {title}
        </h3>
        <p className='leading-6 line-clamp-2 text-neutral-500 text-sm mt-2 mb-4'>
          {description}
        </p>
        <div className='flex items-center text-neutral-400 text-sm'>
          <time className='flex items-center gap-1'>
            <AiOutlineCalendar className='text-base' /> {formattedDate(date)}
          </time>
          <span className='px-2'>·</span>
          <div className='flex items-center gap-1'>
            <AiOutlineFieldTime className='text-base' /> {readingTime} min read
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
