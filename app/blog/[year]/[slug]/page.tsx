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

export async function generateMetadata({ params }: BlogMetadata): Promise<Metadata> {
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
    <section className='relative w-full'>
      <article className='mx-auto max-w-4xl'>
        <PostHeader meta={meta} />
        <PostContent slug={meta.slug} content={content} />
        <TagList tags={meta.tags} />
        <Comments />
      </article>
      <div className='fixed right-[max(1rem,calc((100%-896px)/2-208px-2.5rem))] top-24 hidden max-h-[calc(100vh-6rem)] w-52 overflow-y-auto bg-primary pl-4 xl:block'>
        <PageNavigation />
      </div>
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
