import { BiLogoGithub, BiLogoGmail } from 'react-icons/bi';

const contactClass = 'text-xl text-zinc-600';

function Footer() {
  return (
    <footer className='h-24 transform -translate-y-full border-t'>
      <div className='max-w-3xl h-full flex flex-col justify-center gap-1 px-4 mx-auto'>
        <ul className='flex gap-2'>
          <li>
            <a href='https://github.com/hxezin' target='_blank'>
              <BiLogoGithub className='text-xl text-zinc-500' />
            </a>
          </li>
          <li>
            <a href='mailto:leehxejin@gmail.com' target='_blank'>
              <BiLogoGmail className='text-xl text-zinc-500' />
            </a>
          </li>
        </ul>
        <div className='text-sm text-zinc-500'>© 2023 Hyejin Lee</div>
      </div>
    </footer>
  );
}

export default Footer;
