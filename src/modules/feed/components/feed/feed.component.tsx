import { FC } from 'react';
import { ArticleList, FeedToggle } from '../index';
import { Container } from '../../../../common/components';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  return (
    <Container>
      <FeedToggle />
      <div className='flex'>
        <ArticleList />
        <div className='w-1/4'>tags</div>
      </div>
    </Container>
  )
}