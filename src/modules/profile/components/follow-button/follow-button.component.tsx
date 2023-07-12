import clsx from 'clsx';
import { FC } from 'react';

enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}
interface FollowButtonProps {
  username: string;
  btnStyle?: keyof typeof ButtonStyleEnum;
}

export const FollowButton: FC<FollowButtonProps> = ({username, btnStyle = ButtonStyleEnum.DARK}) => {
  const btnClasses = clsx('text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm rounded-buttonSm active:bg-conduit-activeBtn', {
    'border-conduit-darkenGray text-conduit-darkenGray bg-conduit-followGray': btnStyle === ButtonStyleEnum.DARK,
    'border-conduit-followGray text-conduit-followGray hover:bg-conduit-followGray hover:text-white': btnStyle === ButtonStyleEnum.LIGHT,
  })
  return (
    <button className={btnClasses}>
      <i className="ion-plus-round" />
      &nbsp; Follow {username}
    </button>
  )
}
