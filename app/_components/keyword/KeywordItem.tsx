import { keywordMapping } from '@/_helpers/keyword';
import Link from 'next/link';

interface Props {
  keyword: string;
}

function KeywordItem({ keyword }: Props) {
  const linkPath = `/keyword/${keyword}`;

  return (
    <li>
      <Link
        href={linkPath}
        className='border px-2 py-0.5 rounded-xl text-xs text-neutral-700 border-neutral-400 bg-neutral-100 hover:bg-amber-300'
      >
        {keywordMapping[keyword]}
      </Link>
    </li>
  );
}

export default KeywordItem;
