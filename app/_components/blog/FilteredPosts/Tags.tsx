import { Tag } from '@/_type/post';

interface Props {
  tags: Tag;
  isSelected: (tag: string) => boolean;
  onClick: (tag: string) => void;
}

function Tags({ tags, isSelected, onClick }: Props) {
  return (
    <div className='text-sm'>
      <p className='mb-2 px-2 text-base font-bold text-accent'>태그</p>
      <ul className='flex max-h-[calc(100vh-15rem)] flex-col gap-4 overflow-y-auto py-2 pr-2 text-sm [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-300 dark:[&::-webkit-scrollbar-thumb]:bg-indigo-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-700 [&::-webkit-scrollbar]:w-2'>
        {Object.entries(tags).map(([key, value]) => {
          return (
            <li
              key={key}
              className={`mr-auto cursor-pointer whitespace-nowrap rounded-xl px-2 py-0.5 transition-colors duration-200 ${
                isSelected(key)
                  ? 'bg-indigo-100 text-neutral-950 hover:bg-indigo-200 dark:bg-indigo-300 dark:hover:bg-indigo-400'
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
