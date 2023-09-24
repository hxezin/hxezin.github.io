import Link from 'next/link';

interface Props {
  tags: string[];
}

function TagList({ tags }: Props) {
  return (
    <ul className='flex gap-2'>
      {tags.map((tag) => (
        <li>
          <Link
            href={{
              pathname: '/blog',
              query: { tag },
            }}
          >
            <div className='text-indigo-400 text-sm'>#{tag}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagList;
