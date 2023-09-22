import type { Metadata } from 'next';
import { getPostData, getPostFiles } from '@/_helpers/post';
import PostHeader from '@/_components/blog/PostHeader';
import PostContent from '@/_components/blog/PostContent';
import Comments from '@/_components/blog/Comments';
import PageNavigation from '@/_components/blog/PageNavgiation';

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
  const { slug: yearSlug, content, tags, title, date, readingTime } = postData;

  return (
    <section className='w-full relative md:flex gap-10'>
      <article>
        <PostHeader
          tags={tags}
          title={title}
          date={date}
          readingTime={readingTime}
        />
        <PostContent slug={yearSlug} content={content} />
        <Comments />
      </article>
      <PageNavigation />
    </section>
  );
}

export default PostDetail;
