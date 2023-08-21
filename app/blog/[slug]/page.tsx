import type { Metadata, ResolvingMetadata } from 'next';
import PostContent from '@/_components/post/post-detail/PostContent';
import { getPostData, getPostFiles } from '@/_helpers/post';

export const revalidate = 600;
export async function generateStaticParams() {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return slugs.map((slug) => ({ slug: slug }));
}

interface BlogMetadata {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: BlogMetadata,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const postData = getPostData(slug);

  return {
    title: postData.title,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
    },
  };
}

interface Props {
  params: { slug: string };
}

function PostDetail({ params }: Props) {
  const { slug } = params;
  const postData = getPostData(slug);

  return (
    <>
      <PostContent post={postData} />
    </>
  );
}

export default PostDetail;
