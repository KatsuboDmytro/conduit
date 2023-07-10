import { FC } from 'react';

interface FavouriteButtonProps {
  count: number;
}

export const FavouriteButton: FC<FavouriteButtonProps> = ({ count }) => {
  return (
    <button className='text-conduit-green border-conduit-green text-center align-middle cursor-pointer 
    border rounded-buttonSm py-1 px-2 text-sm hover:text-white hover:bg-conduit-green 
    focus:bg-conduit-darkGreen focus:text-white'>
      <i className="ion-heart" />
      <span className='ml-1 font-normal '>{count}</span>
    </button>
  )
}