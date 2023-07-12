import { FC } from 'react';
import { ArticleAuthor, NameStyleEnum } from '../article-author/article-author.component';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { FavouriteButton } from '../favourite-button/favourite-button.component';

interface ArticleMetaProps {
  authorNameStyle?: keyof typeof NameStyleEnum;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({authorNameStyle = NameStyleEnum.GREEN}) => {

  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={{
            username:'John Snow',
            image: '',
            following: false,
          }}
          createdAt={new Date().toISOString()}
          nameStyle={authorNameStyle}
        />
      </div>
      <div className="inline-flex gap-4">
        <FollowButton username='John' btnStyle='LIGHT' />
        <FavouriteButton count={84} extended />
      </div>
    </div>
  );
};