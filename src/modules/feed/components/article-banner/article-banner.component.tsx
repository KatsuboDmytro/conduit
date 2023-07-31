import { FC } from 'react';
import { Container } from '../../../../common/components';
import { ArticleAuthor } from '../article-author/article-author.component';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { FavouriteButton } from '../favourite-button/favourite-button.component';
import { ArticleMeta } from '../article-meta/article-meta.component';
import { Author } from '../../api/dto/global-feed.in';

interface ArticleBannerProps {
  title: string;
  author: Author;
  likes: number;
  publishedAt: string;
}

export const ArticleBanner: FC<ArticleBannerProps> = ({
  title, 
  author, 
  likes,
  publishedAt,
}) => {

  return (
    <div className="bg-conduit-1100 pt-8 pb-4 mb-8">
      <Container>
        <h1 className="text-white text-articleTitle font-semibold leading-articleTitle mb-8">
          {title}
        </h1>
        <ArticleMeta 
        author={author} 
        likes={likes} 
        publishedAt={publishedAt} />
      </Container>
    </div>
  );
};