import HeaderNavigation from '@/_components/layout/Header/HeaderNavigation';
import ThemeButton from '@/_components/layout/Header/ThemeButton';

function Header() {
  return (
    <header className='sticky top-0 z-50 w-full bg-primary'>
      <div className='mx-auto flex h-16 max-w-4xl items-center justify-between px-4'>
        <HeaderNavigation />
        <ThemeButton />
      </div>
    </header>
  );
}

export default Header;
