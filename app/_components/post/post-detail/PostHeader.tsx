import TagList from '@/_components/tag/TagList';
import { formattedDate } from '@/_helpers/format';
import Image from 'next/image';

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
      <time className='text-sm text-zinc-400'>{formattedDate(date)}</time>
    </header>
  );
}

export default PostHeader;
