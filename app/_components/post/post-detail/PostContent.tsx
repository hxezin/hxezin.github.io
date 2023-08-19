import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import PostHeader from './PostHeader';
import { Post } from '@/_type/post';
import Link from 'next/link';

interface Props {
  post: Post;
}

function PostContent({ post }: Props) {
  const customRenderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className='my-4 mx-auto w-full max-w-xl'>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
              className='w-auto h-auto'
              priority
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    a({ ...props }) {
      return <Link href={props.href}>{props.children}</Link>;
    },
  };

  return (
    <article className='py-8'>
      <PostHeader keyword={post.keyword} title={post.title} date={post.date} />
      <div>
        <ReactMarkdown className='my-8' components={customRenderers}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default PostContent;
