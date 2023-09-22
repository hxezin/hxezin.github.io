interface Props {
  tag: string;
}

function TagItem({ tag }: Props) {
  return (
    <li>
      <div className='border px-2 py-0.5 rounded-xl text-xs text-neutral-400 border-neutral-300 bg-neutral-100 hover:bg-amber-300 hover:text-neutral-700'>
        {tag}
      </div>
    </li>
  );
}

export default TagItem;
