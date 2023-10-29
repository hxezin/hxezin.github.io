import { CATEGORY } from '@/_helpers/category';

interface Props {
  currentCategory: string;
  onClick: (category: string) => void;
}

function Category({ currentCategory, onClick }: Props) {
  return (
    <ul className='flex gap-3 justify-center items-center py-8'>
      {CATEGORY.map((category) => {
        let isActive = category === currentCategory;

        return (
          <li
            key={category}
            className={`px-2 py-0.5 rounded hover:bg-secondary cursor-pointer transition-color duration-300 ${
              isActive ? 'text-primary font-semibold' : 'text-secondary'
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
