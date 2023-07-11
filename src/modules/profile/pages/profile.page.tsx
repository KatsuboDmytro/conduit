import { FC } from 'react';
import { ProfileBanner } from '../components/profile-banner/profile-banner.component';
import { Feed, FeedToggle } from '../../feed/components';
import { useGetProfileFeedQuery } from '../../feed/api/repository';
import { useLocation, useParams } from 'react-router-dom';
import { usePageParam } from '../../feed/hooks/use-page-param.hook';
import { Container } from '../../../common/components';

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  const { page } = usePageParam();
  const { profile } = useParams();
  const { pathname } = useLocation();

  const { data, isLoading, isFetching, error } = useGetProfileFeedQuery({
    page, 
    author: profile!,
    isFavorite: pathname.includes(`/${encodeURIComponent(profile!)}/favorites`)
  });

  const feedToggleItem = [{text: 'Favourited articles', link:`/${encodeURIComponent(profile!)}/favorites`}];

  return (
    <>
      <ProfileBanner />
      <Container>
        <FeedToggle 
          defaultText='My Articles' 
          defaultLink={`/${encodeURIComponent(profile!)}`}
          items={feedToggleItem}
        />
        <Feed 
          data={data} 
          isLoading={isLoading} 
          isFetching={isFetching} 
          error={error}
        />
      </Container>
    </>
  )
}
