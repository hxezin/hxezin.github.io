import TagList from '@/_components/keyword/KeywordList';
import { formattedDate } from '@/_helpers/format';
import { Post } from '@/_type/post';
import Link from 'next/link';

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  const { title, description, date, slug, keyword } = post;

  const linkPath = `/blog/${slug}`;

  return (
    <li>
      <Link href={linkPath}>
        <div className='group'>
          <h3 className='font-bold w-fit group-hover:shadow-[inset_0_-12px_0_#fcd34d]'>
            {title}
          </h3>
          <p className='leading-6 line-clamp-2 text-neutral-600 mt-2 mb-4'>
            {description}
          </p>
        </div>
      </Link>
      <div className='flex items-center'>
        <time className='text-sm text-neutral-400 mr-3'>
          {formattedDate(date)}
        </time>
        <TagList tags={keyword} />
      </div>
    </li>
  );
}

export default PostItem;
