'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  stackoverflowLight,
  stackoverflowDark,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { createHeadingId } from '@/_helpers/format';
import { useContext } from 'react';
import { ThemeContext } from '@/_contexts/ThemeContext';

interface Props {
  slug: string;
  content: string;
}

function PostContent({ slug, content }: Props) {
  const { theme } = useContext(ThemeContext);

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
    strong({ ...props }) {
      return <strong className='text-primary'>{props.children}</strong>;
    },
    a({ ...props }) {
      return (
        <a
          href={props.href}
          target='_blank'
          className='text-primary decoration-primary underline-offset-4 decoration-2 hover:text-accent'
        >
          {props.children}
        </a>
      );
    },
    code({ ...props }) {
      const match = /language-(\w+)/.exec(props.className) as RegExpExecArray;

      if (!match) {
        return (
          <code className='px-1.5 py-1 mx-0.5 bg-gray-100 dark:bg-gray-700 text-accent rounded-lg font-normal'>
            {props.children}
          </code>
        );
      }

      return (
        <SyntaxHighlighter
          style={theme === 'light' ? stackoverflowLight : stackoverflowDark}
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
          className='mt-20 sm:mt-32 first:mt-0 pt-8 pb-4 border-b border-primary text-primary'
        >
          {props.children}
        </h2>
      );
    },
    h3({ ...props }) {
      return (
        <h3
          id={createHeadingId(props.children[0])}
          className='mt-10 pt-8 pb-2 text-primary'
        >
          {props.children}
        </h3>
      );
    },
  };

  return (
    <ReactMarkdown
      components={customRenderers}
      className='w-full my-20 sm:my-32 text-primary prose prose-pre:bg-[#F6F6F6] dark:prose-pre:bg-[#1C1B1B] leading-8 max-w-3xl md:max-w-2xl'
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}

export default PostContent;
