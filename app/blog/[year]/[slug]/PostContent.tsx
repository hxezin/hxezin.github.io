'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { createHeadingId } from '@/_helpers/format';

interface Props {
  slug: string;
  content: string;
}

function PostContent({ slug, content }: Props) {
  const customRenderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className='w-full'>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
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
          className='text-indigo-400 no-underline decoration-indigo-500 underline-offset-4 decoration-1 hover:underline'
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
          style={stackoverflowLight}
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
        <h2
          id={createHeadingId(props.children[0])}
          className='mt-20 sm:mt-40 first:mt-0 py-4 border-b border-neutral-900'
        >
          {props.children}
        </h2>
      );
    },
    h3({ ...props }) {
      return (
        <h3 className='mt-10' id={createHeadingId(props.children[0])}>
          {props.children}
        </h3>
      );
    },
  };

  return (
    <ReactMarkdown
      components={customRenderers}
      className='w-full my-10 prose prose-pre:bg-[#F6F6F6] leading-8 max-w-3xl lg:max-w-2xl'
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}

export default PostContent;