import React from 'react';
import Image from 'next/image';
import { createHeadingId } from '@/_helpers/format';
import { Code } from 'bright';

Code.theme = {
  dark: 'github-dark',
  light: 'github-light',
};

export const mdxComponents = (slug: string) => {
  return {
    pre: ({ ...props }) => {
      return <Code {...props} />;
    },

    p: ({ ...props }) => {
      if (props.children.type === 'img') {
        const image = props.children.props;

        return (
          <div className='w-full'>
            <Image
              src={`/images/posts/${slug}/${image.src}`}
              alt={`${image.alt}`}
              width={800}
              height={500}
              className='h-auto'
              priority
            />
          </div>
        );
      }
      return (
        <p className='text-primary before:content-none'>{props.children}</p>
      );
    },

    a: ({ ...props }) => (
      <a
        href={props.href}
        target='_blank'
        className='text-primary decoration-primary underline-offset-4 decoration-2 hover:text-accent'
      >
        {props.children}
      </a>
    ),

    strong: ({ ...props }) => (
      <strong className='text-primary'>{props.children}</strong>
    ),

    h2: ({ ...props }) => (
      <h2
        id={createHeadingId(props.children)}
        className='mt-20 sm:mt-32 first:mt-0 pt-8 pb-4 border-b border-primary text-primary'
      >
        {props.children}
      </h2>
    ),

    h3: ({ ...props }) => (
      <h3
        id={createHeadingId(props.children)}
        className='mt-10 pt-8 pb-2 text-primary'
      >
        {props.children}
      </h3>
    ),

    th: ({ ...props }) => (
      <th className='text-primary font-bold'>{props.children}</th>
    ),
  };
};
