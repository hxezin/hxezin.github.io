import { CONTACT } from '@/_helpers/about';

function Footer() {
  return (
    <footer className='h-24 transform -translate-y-full border-t border-primary'>
      <div className='max-w-4xl h-full flex flex-col justify-center gap-1 px-4 mx-auto text-secondary'>
        <ul className='flex gap-2'>
          {CONTACT.map((contact) => {
            return (
              <li key={contact.name}>
                <a href={contact.href} target='_blank'>
                  <contact.icon className='text-xl' />
                </a>
              </li>
            );
          })}
        </ul>
        <div className='text-sm'>© 2023 hxezin </div>
      </div>
    </footer>
  );
}

export default Footer;
