import { formattedDate } from '@/_helpers/format';
import { Meta } from '@/_type/post';
import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  posts: Meta[];
}

function RecentPosts({ posts }: Props) {
  return (
    <section>
      <h3 className='about-header'>Recent posts</h3>
      <ul className='grid grid-cols-1 gap-1 py-6'>
        {posts.map((post) => {
          return (
            <Fragment key={post.slug}>
              <li className='px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-secondary'>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className='text-lg font-bold'>
                    <span className='align-middle'>{post.title}</span>
                    <time className='ml-2 text-xs font-normal text-secondary'>
                      {formattedDate(post.date)}
                    </time>
                  </h3>
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}

export default RecentPosts;
