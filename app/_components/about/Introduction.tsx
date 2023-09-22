import { FiGithub, FiMail } from 'react-icons/fi';

const contactClass =
  'p-3 rounded-3xl hover:bg-neutral-100 text-xl transition-color duration-300';

function Introduction() {
  return (
    <section className='w-full flex flex-col gap-8'>
      <h1>
        <span className='font-light'>안녕하세요.</span>
        <br />
        <span className='font-light'>프론트엔드 개발자</span> 이혜진
        <span className='font-light'>입니다.</span>
      </h1>
      <p>
        지식과 경험을 공유하는 것에 가치를 두며, 동료들과 지식을 공유하고 함께
        성장하는 것을 느낄 때 보람을 얻습니다. 다양한 기술 스택을 적극적으로
        학습하고 전문성을 확장하기 위해 노력중입니다. 상황에 맞는 최선의 기술을
        선택할 수 있는 개발자가 되는 것이 목표입니다.
      </p>
      <ul className='flex items-center gap-2'>
        <li className={contactClass}>
          <a href='https://github.com/hxezin' target='_blank'>
            <FiGithub />
          </a>
        </li>
        <li className={contactClass}>
          <a href='mailto:leehxejin@gmail.com' target='_blank'>
            <FiMail />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Introduction;
