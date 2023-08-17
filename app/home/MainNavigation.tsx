import Link from 'next/link';

function MainNavigation() {
  return (
    <header className='w-full max-w-4xl h-20 flex justify-between items-center px-10 mx-auto'>
      <Link href='/' className='mx-3 text-xl font-bold'>
        이혜진 블로그
      </Link>
      <nav>
        <ul className='flex align-baseline'>
          <li className='mx-3 text-sm'>
            <Link href='/blog'>Blog</Link>
          </li>
          <li className='mx-3 text-sm'>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
