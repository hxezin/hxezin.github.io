import TagItem from '@/_components/tag/TagItem';

interface Props {
  tags: string[];
}

function TagList({ tags }: Props) {
  return (
    <ul className='flex gap-2'>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} />
      ))}
    </ul>
  );
}

export default TagList;
