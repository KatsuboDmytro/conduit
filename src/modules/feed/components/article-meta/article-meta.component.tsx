import { ComponentProps, FC } from 'react';
import { ArticleAuthor, NameStyleEnum } from '../article-author/article-author.component';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { FavouriteButton } from '../favourite-button/favourite-button.component';
import { Author } from '../../api/dto/global-feed.in';

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
        </div>
      )}
    </div>
  );
};