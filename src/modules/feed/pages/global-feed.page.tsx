import { FC } from 'react';
import { Banner } from '../../../common/components';
import { Feed } from '../components';

interface GlobalFeedPageProps {}

export const GlobalFeedPage: FC<GlobalFeedPageProps> = () => {
  return (
    <>
      <Banner />
      <Feed />
    </>
  )
}
