import { FC } from 'react';

interface FollowButtonProps {
  username: string;
}

export const FollowButton: FC<FollowButtonProps> = ({username}) => {
  return (
    <button className='text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm 
    rounded-buttonSm border-conduit-darkenGray text-conduit-darkenGray bg-conduit-followGray active:bg-conduit-activeBtn'>
      <i className="ion-plus-round" />
      &nbsp; Follow {username}
    </button>
  )
}
