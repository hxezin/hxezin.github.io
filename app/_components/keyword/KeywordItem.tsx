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
        className='border px-1 py-0.5 rounded-xl text-xs text-neutral-700 bg-neutral-200'
      >
        {tag}
      </Link>
    </li>
  );
}

export default KeywordItem;
