import { getCategoryPosts } from '@/_helpers/post';
import PostsGrid from '@/_components/blog/PostsGrid';
import { CATEGORY } from '@/_helpers/category';
import BlogHeader from '@/blog/BlogHeader';

export async function generateStaticParams() {
  const categories = CATEGORY.map((category) => ({ category }));
  return categories;
}

interface Props {
  params: { category: string };
}

function CategoryPage({ params }: Props) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getCategoryPosts(decodedCategory);

  return (
    <section>
      <BlogHeader currentCategory={category} postCount={posts.length} />
      <PostsGrid posts={posts} />
    </section>
  );
}

export default CategoryPage;
