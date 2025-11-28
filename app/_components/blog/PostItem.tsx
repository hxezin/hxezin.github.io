import { formattedDate } from '@/_helpers/format';
import { Meta } from '@/_type/post';
import Link from 'next/link';
import { AiOutlineCalendar, AiOutlineFieldTime } from 'react-icons/ai';

interface Props {
  post: Meta;
}

function PostItem({ post }: Props) {
  const { title, description, date, slug, readingTime } = post;
  const linkPath = `/blog/${slug}`;

  return (
    <li>
      <Link href={linkPath} className='group'>
        <h3 className='w-fit font-bold transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-12px_0] group-hover:shadow-indigo-200 dark:group-hover:shadow-indigo-500'>
          {title}
        </h3>
        <p className='my-2 line-clamp-2 text-sm leading-6 text-neutral-500'>{description}</p>
        <div className='flex items-center text-sm text-neutral-400'>
          <time className='flex items-center gap-1'>
            <AiOutlineCalendar className='text-base' /> {formattedDate(date)}
          </time>
          <span className='px-1.5 text-neutral-200'>·</span>
          <div className='flex items-center gap-1'>
            <AiOutlineFieldTime className='text-base' /> {readingTime} min read
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
