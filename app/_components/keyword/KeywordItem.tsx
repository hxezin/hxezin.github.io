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
        className='border px-2 py-0.5 rounded-xl text-xs text-neutral-400 border-neutral-300 bg-neutral-100 hover:bg-amber-300 hover:text-neutral-700'
      >
        {keywordMapping[keyword]}
      </Link>
    </li>
  );
}

export default KeywordItem;
