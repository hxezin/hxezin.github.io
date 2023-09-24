import Image from 'next/image';

function Hero() {
  return (
    <section className='w-full flex gap-5 mb-16 sm:relative left-[-15px]'>
      <div className='hidden sm:inline-block'>
        <Image
          src='/images/site/profile.png'
          alt='프로필 이미지'
          width={150}
          height={150}
        />
      </div>
      <div className='flex flex-col justify-center gap-2'>
        <p className='text-indigo-600 text-sm font-semibold'>@hxezin</p>
        <h1 className='font-extrabold'>이혜진</h1>
        <p className='text-neutral-400 text-sm'>
          <em>Frontend Developer</em>
        </p>
      </div>
    </section>
  );
}

export default Hero;
