import Image from 'next/image';

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
        </div>
      </div>
    </section>
  );
}

export default Hero;
