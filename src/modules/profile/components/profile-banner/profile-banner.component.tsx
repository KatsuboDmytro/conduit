import { FC } from 'react';
import { Container } from '../../../../common/components';
import { FollowButton } from '../follow-button/follow-button.component';
import { Profile } from '../../api/dto/get-profile.in';
import { useAuth } from '../../../auth/hooks/useAuthState';
import { Button } from '../../../../common/components/button/button.component';
import { useNavigate } from 'react-router';
import { routes } from '../../../../core/routes';

interface ProfileBannerProps {
  profile: Profile;
}

export const ProfileBanner: FC<ProfileBannerProps> = ({profile}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate(routes.settings.path);
  }
  
  return (
    <div className="bg-conduit-tagCloud pt-8 pb-4 mb-8">
      <Container>
        <div>
          <img
            src={profile.image}
            className="w-25 h-25 rounded-full mx-auto mb-4"
            alt={`${profile.username} avatar`}
          />
          <h2 className="text-center font-bold text-2xl">{profile.username}</h2>
        </div>
        <div className="flex justify-end">
          {user?.username !== profile.username ? (
            <FollowButton username={profile.username} />
          ) : (
            <Button>
              <div onClick={goToSettings}>
                <i className='mr-1 ion-gear-a' /> Edit settings
              </div>
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}
