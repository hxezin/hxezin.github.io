import KeywordItem from '@/_components/keyword/KeywordItem';

interface Props {
  tags: string[];
}

function KeywordList({ tags }: Props) {
  return (
    <ul className='flex gap-2'>
      {tags.map((tag) => (
        <KeywordItem key={tag} tag={tag} />
      ))}
    </ul>
  );
}

export default KeywordList;
