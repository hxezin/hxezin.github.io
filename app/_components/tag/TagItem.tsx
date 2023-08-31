interface Props {
  tag: string;
}

function TagItem({ tag }: Props) {
  return (
    <li>
      <div className='border px-1 py-0.5 rounded-xl text-xs text-neutral-700 bg-neutral-200'>
        {tag}
      </div>
    </li>
  );
}

export default TagItem;
