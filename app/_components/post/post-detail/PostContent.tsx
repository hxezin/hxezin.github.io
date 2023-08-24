'use client';

import Image from 'next/image';
import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post } from '@/_type/post';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
          <div className='w-full'>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={800}
              height={500}
              className='h-auto'
              priority
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    a({ ...props }) {
      return (
        <a
          href={props.href}
          target='_blank'
          className='underline decoration-purple-600 underline-offset-4 decoration-1 hover:decoration-2'
        >
          {props.children}
        </a>
      );
    },
    code({ ...props }) {
      const match = /language-(\w+)/.exec(props.className) as RegExpExecArray;

      if (!match) {
        return (
          <code className='px-1.5 py-1 mx-0.5 bg-[#f0f0f0] rounded-lg font-normal'>
            {props.children}
          </code>
        );
      }

      return (
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag='div'
          {...props}
        >
          {String(props.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
    h2({ ...props }) {
      return (
        <h2 className='mt-20 sm:mt-40 first:mt-0 py-4 border-b border-zinc-900'>
          {props.children}
        </h2>
      );
    },
  };

  return (
    <article>
      <PostHeader keyword={post.keyword} title={post.title} date={post.date} />
      <ReactMarkdown
        components={customRenderers}
        className='my-8 prose prose-pre:bg-[#282a36] leading-8 max-w-3xl'
        remarkPlugins={[remarkGfm]}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
