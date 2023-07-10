import { FC } from 'react';
import { ArticleList, FeedToggle } from '../index';
import { Container } from '../../../../common/components';
import { useGetGlobalFeedQuery } from '../../api/repository';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  const { data, error, isLoading } = useGetGlobalFeedQuery('');

  if(isLoading){
    return (
      <Container>
        Feed is loading...
      </Container>
    )
  }

  if(error){
    return (
      <Container>
        Error while loading feed.
      </Container>
    )
  }

  return (
    <Container>
      <FeedToggle />
      <div className='flex'>
        <ArticleList list={data?.articles || []} />
        <div className='w-1/4'>tags</div>
      </div>
    </Container>
  )
}