import { CONTACT, HEADER_CSS } from '@/_helpers/about';

function Contact() {
  return (
    <section className='mb-16'>
      <h3 className={HEADER_CSS}>Contact</h3>
      <ul className='py-6 pl-1'>
        {CONTACT.map((contact) => {
          return (
            <li key={contact.name} className='inline-block mr-2 mb-3'>
              <a
                href={contact.href}
                target='_blank'
                className='flex items-center text-sm gap-2 px-2 py-1 rounded hover:bg-neutral-100 transition-color duration-300'
              >
                <contact.icon className='text-xl' /> {contact.name}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Contact;
