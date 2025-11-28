import { CATEGORY } from '@/_helpers/category';

interface Props {
  currentCategory: string;
  onClick: (category: string) => void;
}

function Category({ currentCategory, onClick }: Props) {
  return (
    <ul className='flex items-center justify-center gap-3 py-8'>
      {CATEGORY.map((category) => {
        const isActive = category === currentCategory;

        return (
          <li
            key={category}
            className={`transition-color cursor-pointer rounded px-2 py-0.5 duration-300 hover:bg-secondary ${
              isActive ? 'font-semibold text-primary' : 'text-secondary'
            }`}
            onClick={() => onClick(category)}
          >
            {category}
          </li>
        );
      })}
    </ul>
  );
}

export default Category;
