import { FC } from 'react';
import { Container } from '../../../../common/components';
import { FollowButton } from '../follow-button/follow-button.component';

interface ProfileBannerProps {}

export const ProfileBanner: FC<ProfileBannerProps> = () => {
  return (
    <div className="bg-conduit-tagCloud pt-8 pb-4 mb-8">
      <Container>
        <div>
          <img
            src={'profile.image'}
            className="w-25 h-25 rounded-full mx-auto mb-4"
            alt={`${'profile.username'} avatar`}
          />
          <h2 className="text-center font-bold text-2xl">{'profile.username'}</h2>
        </div>
        <div className="flex justify-end">
          <FollowButton />
        </div>
      </Container>
    </div>
  )
}