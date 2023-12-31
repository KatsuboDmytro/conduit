import clsx from 'clsx';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from '../index'
import { useAuth } from '../../../modules/auth/hooks/useAuthState';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { isLoggedIn, logOut, user } = useAuth();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    clsx('py-navItem hover:text-black/60 hover:no-underline', {
    'text-black/30': !isActive,
    'text-black/80': isActive
  });

  return (
    <header>
      <nav className="px-2 py-4">
        <Container>
          <div className="flex justify-between items-center max-w-screen-xl mx-auto">
            <Link to="/" className="font-titillilum text-2xl mr-8 text-conduit-green">
              conduit
            </Link>
            <ul className="pl-0 mb-0 list-none flex">
              <li>
                <NavLink to="/" className={navLinkClasses} end>
                  Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="ml-4">
                    <NavLink to="/editor" className={navLinkClasses}>
                      <i className='mr-1 ion-compass' />
                      New article
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/settings" className={navLinkClasses}>
                      <i className='mr-1 ion-gear-a' />
                      Settings
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to={`/${user?.username}` } className={navLinkClasses}>
                      <img src={`${user?.image}`} className='w-6 h-6 rounded-full inline mr-2' alt="avatar" />
                      {user?.username}
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/" className={navLinkClasses} onClick={logOut}>
                      Log out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="ml-4">
                    <NavLink to="/sign-in" className={navLinkClasses}>
                      Sign in
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/sign-up" className={navLinkClasses}>
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
}