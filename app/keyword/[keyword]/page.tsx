import { getKeywordPosts } from '@/_helpers/post';
import PostsGrid from '@/_components/post/PostsGrid';
import { keywordMapping } from '@/_helpers/keyword';

export async function generateStaticParams() {
  const keywords = Object.keys(keywordMapping).map((keyword) => ({ keyword }));
  return keywords;
}

interface Props {
  params: { keyword: string };
}

function KeywordDetail({ params }: Props) {
  const { keyword } = params;
  const decodedKeyword = decodeURIComponent(keyword);
  const posts = getKeywordPosts(decodedKeyword);

  return (
    <section>
      <header className='mb-16'>
        <h1 className='text-indigo-500 mb-1'>
          {keywordMapping[decodedKeyword]}
        </h1>
        <p className='text-sm'>A collection of {posts.length} post</p>
      </header>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default KeywordDetail;
