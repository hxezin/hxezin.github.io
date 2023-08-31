import type { Metadata } from 'next';
import { getPostData, getPostFiles } from '@/_helpers/post';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import Toc from '@/_components/Toc';
import Comments from '@/_components/Comments';
export const revalidate = 600;
export async function generateStaticParams() {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map(({ year, slug }) => ({
    year,
    slug,
  }));

  return slugs;
}

interface BlogMetadata {
  params: { year: string; slug: string };
}

export async function generateMetadata({
  params,
}: BlogMetadata): Promise<Metadata> {
  const { year, slug } = params;

  const postData = getPostData(year, slug);

  return {
    title: postData.title,
    openGraph: {
      title: postData.title,
      description: postData.description,
    },
  };
}

interface Props {
  params: { year: string; slug: string };
}

function PostDetail({ params }: Props) {
  const { year, slug } = params;
  const postData = getPostData(year, slug);
  const { slug: yearSlug, content, keyword, title, date } = postData;

  return (
    <section className='w-full relative flex gap-10'>
      <article>
        <PostHeader keyword={keyword} title={title} date={date} />
        <PostContent slug={yearSlug} content={content} />
        <Comments />
      </article>
      <Toc />
    </section>
  );
}

export default PostDetail;
