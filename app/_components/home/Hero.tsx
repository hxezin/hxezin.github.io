import Image from 'next/image';

function Hero() {
  return (
    <section className='w-full flex gap-5 mb-16 sm:relative left-[-15px]'>
      <div className='hidden sm:block'>
        <Image src='/images/blog/profile.webp' alt='profile' width={150} height={150} priority />
      </div>
      <div className='flex flex-col justify-center gap-2'>
        <p className='text-accent text-sm font-semibold'>@hxezin</p>
        <h1 className='font-extrabold'>이혜진</h1>
        <p className='text-secondary text-sm'>
          <em>Frontend Developer</em>
        </p>
      </div>
    </section>
  );
}

export default Hero;
