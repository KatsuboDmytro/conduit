import { FC } from 'react';
import { ArticleBanner, TagList } from '../components';
import { Container } from '../../../common/components';
import { ArticleMeta } from '../components/article-meta/article-meta.component';

interface ArticlePageProps {}

export const ArticlePage: FC<ArticlePageProps> = () => {

  return (
    <div>
      <ArticleBanner />
      <Container>
        <div className="pb-8 border-b mb-6">
          <p className='text-articleBody leading-articleBody font-sourceSerif mb-4'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat molestias, ullam nihil omnis quae alias? Corporis totam qui explicabo. Veritatis illum dignissimos voluptatem laborum id in autem officiis iste.
          </p>
          <TagList list={['123']} />
        </div>
        <div className='flex justify-center'>
          <ArticleMeta authorNameStyle='GREEN' />
        </div>
      </Container>
    </div>
  );
};