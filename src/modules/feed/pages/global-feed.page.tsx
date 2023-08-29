import { FC } from 'react';
import { Banner, Container } from '../../../common/components';
import { Feed, FeedToggle, TagCloud } from '../components';
import { useLocation, useMatch, useSearchParams } from 'react-router-dom';
import { useGetGlobalFeedQuery } from '../api/repository';
import { usePageParam } from '../hooks/use-page-param.hook';
import { useAuth } from '../../auth/hooks/useAuthState';
import { routes } from '../../../core/routes';

interface GlobalFeedPageProps {}

export const GlobalFeedPage: FC<GlobalFeedPageProps> = () => {
  const { isLoggedIn } = useAuth();
  const personalFeed = useMatch(routes.personalFeed);
  
  const [searchParams] = useSearchParams();
  const { page } = usePageParam();
  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({ 
    page,
    tag: searchParams.get('tag'),
    isPersonalFeed: personalFeed !== null,
  });

  const feedToggleItems = [];
  if(isLoggedIn) {
    feedToggleItems.push({
      text: 'Your feed',
      link: '/personal-feed',
    })
  }
  return (
    <>
      {!isLoggedIn && <Banner />}
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
