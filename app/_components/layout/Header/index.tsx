import HeaderNavigation from '@/_components/layout/Header/HeaderNavigation';
import ThemeButton from '@/_components/layout/Header/ThemeButton';

function Header() {
  return (
    <header className='w-full h-16 flex justify-between items-center'>
      <HeaderNavigation />
      <ThemeButton />
    </header>
  );
}

export default Header;
