import { FC } from 'react';
import { Banner, Header } from './common/components';
import { Feed } from './modules/feed/components';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div className='pb-16'>
      <Header />
      <Banner />
      <Feed />
    </div>
  );
}