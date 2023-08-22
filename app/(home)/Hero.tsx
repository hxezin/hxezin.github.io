import Image from 'next/image';
import { FiGithub, FiMail } from 'react-icons/fi';

const contactClass =
  'p-2 rounded-3xl hover:bg-purple-100 text-lg transition-color duration-300';

function Hero() {
  return (
    <section className='w-full flex gap-3 mb-16'>
      <div className='hidden sm:inline-block'>
        <Image
          src='/images/site/profile.png'
          alt='프로필 이미지'
          width={200}
          height={200}
        />
      </div>
      <div className='flex flex-col justify-center gap-4'>
        <div className='flex flex-col justify-center pl-2'>
          <h3 className='font-bold'>이혜진</h3>
          <p className='text-zinc-500 mb-3 text-base'>Frontend Engineer</p>
          <p className='text-zinc-800'>배움과 성장, 수많은 시행착오 기록</p>
        </div>
        <ul className='flex gap-2'>
          <li className={contactClass}>
            <a href='https://github.com/hxezin' target='_blank'>
              <FiGithub />
            </a>
          </li>
          <li className={contactClass}>
            <a href='mailto:leehxejin@gmail.com' target='_blank'>
              <FiMail />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
