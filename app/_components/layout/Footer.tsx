import { CONTACT } from '@/_helpers/about';

function Footer() {
  return (
    <footer className='h-24 border-t border-primary'>
      <div className='mx-auto flex h-full max-w-4xl flex-col justify-center gap-1 px-4 text-secondary'>
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
        <div className='text-sm'>
          © {new Date().getFullYear()} hxezin — Keep building, keep learning.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
