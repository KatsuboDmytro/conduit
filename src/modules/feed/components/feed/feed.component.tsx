import { FC } from 'react';
import { ArticleList } from '../index';
import { Container } from '../../../../common/components';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  return (
    <div className='flex'>
      <ArticleList />
      <div className='w-1/4'>tags</div>
    </div>
  )
}