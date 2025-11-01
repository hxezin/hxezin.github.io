import { Tag } from '@/_type/post';

interface Props {
  tags: Tag;
  isSelected: (tag: string) => boolean;
  onClick: (tag: string) => void;
}

function Tags({ tags, isSelected, onClick }: Props) {
  return (
    <div className='hidden md:block w-52 text-sm'>
      <p className='text-accent font-bold text-base mb-2 px-2'>태그</p>
      <ul className='flex flex-col gap-4 overflow-y-auto py-2 max-h-[70vh] text-sm'>
        {Object.entries(tags).map(([key, value]) => {
          return (
            <li
              key={key}
              className={`px-2 py-0.5 mr-auto rounded-xl cursor-pointer transition-color duration-200 whitespace-nowrap ${
                isSelected(key)
                  ? 'text-neutral-950 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-300 dark:hover:bg-indigo-400'
                  : 'bg-transparent hover:bg-secondary'
              }`}
              onClick={() => onClick(key)}
            >
              {key} ({value})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tags;
