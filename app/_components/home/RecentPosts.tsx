import { formattedDate } from '@/_helpers/format';
import { Post } from '@/_type/post';
import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  posts: Post[];
}

function RecentPosts({ posts }: Props) {
  return (
    <section>
      <h3 className='about-header'>Recent posts</h3>
      <ul className='py-6 grid grid-cols-1 gap-1'>
        {posts.map((post) => {
          return (
            <Fragment key={post.slug}>
              <li className='px-3 py-2 hover:bg-second'>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className='text-lg font-bold'>
                    <span className='align-middle'>{post.title}</span>
                    <time className='text-second text-xs font-normal ml-2'>
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
