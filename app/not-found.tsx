import Link from 'next/link';

function NotFoundPage() {
  return (
    <section className='w-full flex flex-col items-center gap-2'>
      <h1 className='text-9xl'>404</h1>
      <p className='flex flex-col md:flex-row items-center gap-1'>
        <span>페이지를 찾을 수 없습니다.</span>
        <span>다른 콘텐츠를 보러 가시겠어요?</span>
      </p>
      <Link href='/blog' className='text-indigo-500'>
        Back to blog 🚀
      </Link>
    </section>
  );
}

export default NotFoundPage;
