import { formattedDate } from '@/_helpers/format';
import { AiOutlineCalendar, AiOutlineFieldTime } from 'react-icons/ai';

interface Props {
  tags: string[];
  title: string;
  date: string;
  readingTime: number;
}

function PostHeader({ tags, title, date, readingTime }: Props) {
  return (
    <header className='pb-6 border-b-2 border-primary flex flex-col gap-3'>
      <h1>{title}</h1>
      <div className='flex items-center text-secondary text-sm'>
        <time className='flex items-center gap-1'>
          <AiOutlineCalendar className='text-base' /> {formattedDate(date)}
        </time>
        <span className='px-2'>·</span>
        <div className='flex items-center gap-1'>
          <AiOutlineFieldTime className='text-base' /> {readingTime} min read
        </div>
      </div>
    </header>
  );
}

export default PostHeader;
