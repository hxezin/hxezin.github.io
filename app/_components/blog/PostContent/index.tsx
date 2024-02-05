import { Content } from '@/_type/post';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from 'mdx/types';
import { mdxComponents } from '@/_components/blog/PostContent/mdxComponents';

interface Props {
  slug: string;
  content: Content;
}

function PostContent({ slug, content }: Props) {
  return (
    <section className='w-full my-20 sm:my-32 text-primary prose prose-code:mdx-inline-code leading-8 max-w-3xl md:max-w-2xl'>
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
        components={mdxComponents(slug) as MDXComponents}
      />
    </section>
  );
}

export default PostContent;
