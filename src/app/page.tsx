import ArticleList from '@/features/articles/components/ArticleList';
import DateFilter from '@/features/articles/components/DateFilter';
import Header from '@/shared/widgets/header/Header';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <DateFilter />
      <ArticleList />
    </div>
  );
}
