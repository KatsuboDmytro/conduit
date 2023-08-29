import { FC } from 'react';
import { Header } from './common/components';
import { Route, Routes } from 'react-router';
import { routes } from './core/routes';


interface AppProps {}

export const App: FC<AppProps> = () => {
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