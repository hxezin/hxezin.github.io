import type { Metadata } from 'next';
import { getAllPostsMeta, getPostBySlug } from '@/_helpers/post';
import PostHeader from '@/_components/blog/PostHeader';
import PostContent from '@/_components/blog/PostContent';
import Comments from '@/_components/blog/Comments';
import PageNavigation from '@/_components/blog/PageNavgiation';
import TagList from '@/_components/blog/TagList';

interface BlogMetadata {
  params: { year: string; slug: string };
}

export async function generateMetadata({
  params,
}: BlogMetadata): Promise<Metadata> {
  const { year, slug } = params;

  const postData = await getPostBySlug(year, slug);

  return {
    title: postData.meta.title,
    description: postData.meta.description,
    openGraph: {
      title: postData.meta.title,
      description: postData.meta.description,
    },
  };
}

interface Props {
  params: { year: string; slug: string };
}

async function PostDetail({ params }: Props) {
  const { meta, content } = await getPostBySlug(params.year, params.slug);

  return (
    <section className='w-full relative md:flex gap-10'>
      <article>
        <PostHeader meta={meta} />
        <PostContent slug={meta.slug} content={content} />
        <TagList tags={meta.tags} />
        <Comments />
      </article>
      <PageNavigation />
    </section>
  );
}

export default PostDetail;

export async function generateStaticParams() {
  const allPostsMeta = await getAllPostsMeta();

  const slugs = allPostsMeta.map(({ slug }) => {
    const [year, file] = slug.split('/');
    return { year, slug: file };
  });

  return slugs;
}
