import KeywordItem from '@/_components/keyword/KeywordItem';

interface Props {
  keywords: string[];
}

function KeywordList({ keywords }: Props) {
  return (
    <ul className='flex gap-2'>
      {keywords.map((keyword) => (
        <KeywordItem key={keyword} keyword={keyword} />
      ))}
    </ul>
  );
}

export default KeywordList;
