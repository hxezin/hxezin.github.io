import { HEADER_CSS, SKILL } from '@/_helpers/about';
import React from 'react';

function Skill() {
  return (
    <section className='mb-16'>
      <h3 className={HEADER_CSS}>Skill</h3>
      <ul className='py-6 pl-2'>
        {SKILL.map((skill) => {
          return (
            <li className='inline-block px-2 py-1 mr-2 mb-3 text-xs border rounded-xl border-neutral-400'>
              {skill}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Skill;
