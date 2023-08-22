import type { Metadata } from 'next';
import PostContent from '@/_components/post/post-detail/PostContent';
import { getPostData, getPostFiles } from '@/_helpers/post';

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

  return (
    <section>
      <PostContent post={postData} />
    </section>
  );
}

export default PostDetail;
