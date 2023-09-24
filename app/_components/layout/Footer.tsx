import { CONTACT } from '@/_helpers/about';

function Footer() {
  return (
    <footer className='h-24 transform -translate-y-full border-t'>
      <div className='max-w-4xl h-full flex flex-col justify-center gap-1 px-4 mx-auto'>
        <ul className='flex gap-2'>
          {CONTACT.map((contact) => {
            return (
              <li key={contact.name}>
                <a href={contact.href} target='_blank'>
                  <contact.icon className='text-xl text-neutral-500' />
                </a>
              </li>
            );
          })}
        </ul>
        <div className='text-sm text-neutral-500'>© 2023 hxezin </div>
      </div>
    </footer>
  );
}

export default Footer;
