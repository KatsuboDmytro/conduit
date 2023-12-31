import { ComponentProps, FC } from 'react';
import { Button, ButtonStyleEnum } from '../../../../common/components/button/button.component';
import { useFollowUserMutation, useUnFollowUserMutation } from '../../api/repository';

interface FollowButtonProps {
  username: string;
  isFollowed: boolean;
  btnStyle?: ComponentProps<typeof Button>['btnStyle'];
}

export const FollowButton: FC<FollowButtonProps> = ({
  isFollowed, 
  username, 
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const [triggerFollow] = useFollowUserMutation();
  const [triggerUnFollow] = useUnFollowUserMutation();

  const toggleFollow = () => {
    if(!isFollowed) {
      triggerFollow({ username: encodeURIComponent(username) });
    } else {
      triggerUnFollow({ username: encodeURIComponent(username) });
    }
  }
  
  return (
    <Button btnStyle={btnStyle}>
      <div onClick={toggleFollow}>
        <i className="ion-plus-round" />
        &nbsp; {isFollowed ? 'Unfollow' : 'Follow'} {username}
      </div>
    </Button>
  )
}