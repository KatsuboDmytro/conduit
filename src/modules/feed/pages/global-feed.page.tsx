import { FC } from 'react';
import { Banner, Container } from '../../../common/components';
import { Feed, FeedToggle, TagCloud } from '../components';
import { useSearchParams } from 'react-router-dom';
import { useGetGlobalFeedQuery } from '../api/repository';
import { usePageParam } from '../hooks/use-page-param.hook';

interface GlobalFeedPageProps {}

export const GlobalFeedPage: FC<GlobalFeedPageProps> = () => {
  const [searchParams] = useSearchParams();
  const { page } = usePageParam();
  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({ 
    page,
    tag: searchParams.get('tag'),
  });

  return (
    <>
      <Banner />
      <Container>
        <FeedToggle/>
        <div className="flex">
          <div className="w-3/4">
            <Feed 
              data={data} 
              isLoading={isLoading} 
              isFetching={isFetching} 
              error={error}
            />
          </div>
          <div className="w-1/4 pl-3">
            <TagCloud />
          </div>
        </div>
      </Container>
    </>
  )
}
