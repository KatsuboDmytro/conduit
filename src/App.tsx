import { FC } from 'react';
import { Banner, Header } from './common/components';
import { Feed } from './modules/feed/components';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <>
      <Header />
      <Banner />
      <Feed />
    </>
  );
}