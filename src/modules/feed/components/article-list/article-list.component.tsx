import { FC } from 'react';
import { Article } from '../index';
import { FeedArticle } from '../../api/dto/global-feed.in';

interface ArticleListProps {
  list: FeedArticle[];
}

export const ArticleList: FC<ArticleListProps> = ({ list }) => {
  return (
    <div className='w-3/4'>
      {list.map(article => (
        <Article key={article.slug} {...article} />
      ))}
    </div>
  )
}