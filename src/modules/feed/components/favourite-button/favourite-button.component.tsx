import { FC } from 'react';
import { useAuth } from '../../../auth/hooks/useAuthState';
import { useNavigate } from 'react-router';
import { routes } from '../../../../core/routes';
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../../api/repository';
import { Button } from '../../../../common/components/button/button.component';

interface FavouriteButtonProps {
  count: number;
  extended?: boolean;
  slug: string;
  isFavorited: boolean;
}

export const FavouriteButton: FC<FavouriteButtonProps> = ({ count, extended, slug, isFavorited }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [triggerFavoriteMutation, favoriteMutationState] = useFavoriteArticleMutation();
  const [triggerUnFavoriteMutation, unFavoriteMutationState] = useUnFavoriteArticleMutation();

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      navigate(routes.signIn.path);
      return;
    }

    if(isFavorited) {
      await triggerUnFavoriteMutation({ slug });
    } else {
      await triggerFavoriteMutation({ slug });
    }
  }
  
  return (
    <Button
      btnStyle="GREEN"
      variant={isFavorited ? 'BASE' : 'OUTLINED'}
      onClick={handleFavoriteClick}
      disabled={
        favoriteMutationState.isLoading || unFavoriteMutationState.isLoading
      }
    >
      <i className="ion-heart"></i>
      <span className="ml-1 font-normal">
        {extended && 'Favorite Article ('}
        {count}
        {extended && ')'}
      </span>
    </Button>
  )
}