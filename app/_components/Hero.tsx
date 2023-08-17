import Image from 'next/image';

import { ImGithub, ImMail4 } from 'react-icons/im';

function Hero() {
  return (
    <section className='w-full flex gap-4 py-8'>
      <div>
        <Image
          src='/images/site/profile.png'
          alt='An image showing hyejin profile image'
          width={150}
          height={150}
        />
      </div>
      <div className='flex flex-col justify-center gap-5'>
        <div className='flex flex-col justify-center gap-1'>
          <h1>이혜진</h1>
          <p className='text-fuchsia-700'>Frontend Developer</p>
        </div>
        <div className='flex items-center gap-2'>
          <a
            href='https://github.com/hxezin'
            target='_blank'
            className='text-xl text-zinc-500'
          >
            <ImGithub />
          </a>
          <a
            href='mailto:leehxejin@gmail.com'
            target='_blank'
            className='text-xl text-zinc-500'
          >
            <ImMail4 />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
