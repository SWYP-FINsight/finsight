import ListExample from '@/features/articles/components/ArticleList';
import Header from '@/shared/widgets/header/Header';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <ListExample />
    </div>
  );
}
