import TagList from '@/_components/keyword/KeywordList';
import { formattedDate } from '@/_helpers/format';
import { Post } from '@/_type/post';
import Link from 'next/link';
import { AiOutlineCalendar } from 'react-icons/ai';

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  const { title, description, date, slug, keyword } = post;

  const linkPath = `/blog/${slug}`;

  return (
    <li>
      <TagList tags={keyword} />
      <Link href={linkPath} className='group'>
        <div className='my-4'>
          <h3 className='font-bold w-fit group-hover:shadow-[inset_0_-12px_0_#fcd34d]'>
            {title}
          </h3>
          <p className='leading-6 line-clamp-2 text-neutral-600 mt-2'>
            {description}
          </p>
        </div>
        <div className='flex items-center'>
          <time className='flex items-center gap-1 text-sm text-neutral-400 mr-3'>
            <AiOutlineCalendar className='text-base' /> {formattedDate(date)}
          </time>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
