import { FC } from 'react';
import { Article } from '../index';
import { Container } from '../../../../common/components';

interface ArticleListProps {}

export const ArticleList: FC<ArticleListProps> = () => {
  return (
    <div className='w-3/4'>
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </div>
  )
}