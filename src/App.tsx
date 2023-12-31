import { FC, useEffect } from 'react';
import { Header } from './common/components';
import { Route, Routes, useMatch, useNavigate } from 'react-router';
import { routes } from './core/routes';

interface AppProps {}

export const App: FC<AppProps> = () => {
  const isGlobalFeedPage = useMatch(routes.globalFeed.path);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isGlobalFeedPage) {
      navigate(routes.personalFeed.path)
    }
  }, [])
  
  return (
    <div className='pb-16'>
      <Header />
      <Routes>
        {Object.values(routes).map((route) => (
          <Route
            key={`route-${route.path}`}
            path={route.path}
            element={<route.Element />}
          />
        ))}
      </Routes>
    </div>
  );
}