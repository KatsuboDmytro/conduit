import { FC } from 'react';
import { NavLink } from'react-router-dom'
import { ArticleList } from '../index';

interface FeedToggleProps {}

export const FeedToggle: FC<FeedToggleProps> = () => {
  return (
    <div className='h-8'>
      <ul className='flex'>
        <li>
          <NavLink to={'/'} className='bg-white border-b-2 border-conduit-green py-2 px-4 hover:no-underline'>
            Global Feed
          </NavLink>
        </li>
      </ul>
    </div>
  )
}