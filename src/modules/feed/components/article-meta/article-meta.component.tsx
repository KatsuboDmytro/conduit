import { FC } from 'react';
import { ArticleAuthor, NameStyleEnum } from '../article-author/article-author.component';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { FavouriteButton } from '../favourite-button/favourite-button.component';
import { Author } from '../../api/dto/global-feed.in';

interface ArticleMetaProps {
  authorNameStyle?: keyof typeof NameStyleEnum;
  author: Author;
  likes: number;
  publishedAt: string;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({
  authorNameStyle = NameStyleEnum.GREEN, 
  author,
  likes,
  publishedAt,
}) => {

  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={author}
          publishedAt={publishedAt}
          nameStyle={authorNameStyle}
        />
      </div>
      <div className="inline-flex gap-4">
        <FollowButton username={author.username} btnStyle='LIGHT' />
        <FavouriteButton count={likes} extended />
      </div>
    </div>
  );
};