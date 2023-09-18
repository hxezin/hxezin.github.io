import Link from 'next/link';

interface Props {
  tag: string;
}

function KeywordItem({ tag }: Props) {
  const linkPath = `/keyword/${tag}`;

  return (
    <li>
      <Link
        href={linkPath}
        className='border px-2 py-0.5 rounded-xl text-xs text-neutral-700 border-neutral-400 bg-neutral-100 hover:bg-amber-300'
      >
        {tag}
      </Link>
    </li>
  );
}

export default KeywordItem;
