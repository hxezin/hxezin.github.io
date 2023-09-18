import TagList from '@/_components/keyword/KeywordList';
import { formattedDate } from '@/_helpers/format';
import { AiOutlineCalendar } from 'react-icons/ai';

interface Props {
  keyword: string[];
  title: string;
  date: string;
}

function PostHeader({ keyword, title, date }: Props) {
  return (
    <header className='pb-8 my-4 border-b-2 flex flex-col gap-3'>
      <TagList tags={keyword} />
      <h1>{title}</h1>
      <time className='flex items-center gap-1 text-sm text-neutral-400'>
        <AiOutlineCalendar className='text-base' />
        {formattedDate(date)}
      </time>
    </header>
  );
}

export default PostHeader;
