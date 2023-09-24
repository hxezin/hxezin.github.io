import { Tag } from '@/_type/post';

interface Props {
  tags: Tag;
  isSelected: (tag: string) => boolean;
  onClick: (tag: string) => void;
}

function Tags({ tags, isSelected, onClick }: Props) {
  return (
    <div className='hidden md:block w-52 text-sm'>
      <p className='text-indigo-800 font-bold text-base mb-2 px-2'>태그</p>
      <ul className='flex flex-col gap-4 overflow-y-auto py-2 max-h-[70vh] text-sm'>
        {Object.entries(tags).map(([key, value]) => {
          return (
            <li
              key={key}
              className={`px-2 py-0.5 mr-auto rounded-xl cursor-pointer transition-color duration-200 ${
                isSelected(key)
                  ? 'bg-amber-200 hover:bg-amber-300'
                  : 'bg-transparent hover:bg-neutral-100'
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
