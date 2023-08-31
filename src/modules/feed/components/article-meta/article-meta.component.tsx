import { ComponentProps, FC } from 'react';
import { ArticleAuthor, NameStyleEnum } from '../article-author/article-author.component';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { FavouriteButton } from '../favourite-button/favourite-button.component';
import { Author } from '../../api/dto/global-feed.in';
import { useAuth } from '../../../auth/hooks/useAuthState';
import { Button } from '../../../../common/components/button/button.component';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDeleteArticleMutation } from '../../api/repository';

interface ArticleMetaProps {
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
  authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
  authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
  author: Author;
  isFavorited: boolean;
  slug: string;
  likes?: number;
  publishedAt: string;
  showActionButton?: boolean;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({
  authorNameStyle = NameStyleEnum.GREEN, 
  author,
  slug,
  likes,
  publishedAt,
  showActionButton = true,
  authorDirection,
  authorNameSize,
  isFavorited,
}) => {
  const auth = useAuth();
  const [triggerDeleteArticle, { isLoading }] = useDeleteArticleMutation();

  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate(`/editor/${slug}`);
  };

  const deleteArticle = async () => {
    try {
      await triggerDeleteArticle({ slug }).unwrap();
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={author}
          publishedAt={publishedAt}
          nameStyle={authorNameStyle}
          direction={authorDirection}
          nameSize={authorNameSize}
        />
      </div>
      {showActionButton && (
        <div className="inline-flex gap-4">
          {auth.user?.username === author.username ? (
            <>
              <Button btnStyle="LIGHT">
                <div onClick={navigateToEdit}>
                  <i className="ion-edit" /> Edit Article
                </div>
              </Button>
              <Button btnStyle="DANGER" disabled={isLoading}>
                <div onClick={deleteArticle}>
                  <i className="ion-trash-a" /> Delete Article
                </div>
              </Button>
            </>
          ) : (
            <>
              <FollowButton 
                username={author.username} 
                btnStyle='LIGHT' 
                isFollowed={author.following} 
              />
              <FavouriteButton 
                slug={slug}
                isFavorited={isFavorited}
                count={likes || 0} 
                extended 
              />
            </>
          )}
          
        </div>
      )}
    </div>
  );
};