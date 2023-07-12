import { FC } from 'react';
import { Container } from '../../../../common/components';
import { ArticleAuthor } from '../article-author/article-author.component';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { FavouriteButton } from '../favourite-button/favourite-button.component';
import { ArticleMeta } from '../article-meta/article-meta.component';

interface ArticleBannerProps {}

export const ArticleBanner: FC<ArticleBannerProps> = () => {

  return (
    <div className="bg-conduit-1100 pt-8 pb-4 mb-8">
      <Container>
        <h1 className="text-white text-articleTitle font-semibold leading-articleTitle mb-8">
          {'sdfsdfsdfsdf'}
        </h1>
        {/* <div className="inline-block flex">
          <ArticleAuthor 
            author={{username:'John Stark', image:'', following:false}} 
            createdAt={'22 October'}
            nameStyle={"LIGHT"}
          />
          <div className="inline-flex gap-4">
            <FollowButton username='John Stark'/>
            <FavouriteButton count={84} extended/>
          </div>
        </div> */}

        <ArticleMeta />
      </Container>
    </div>
  );
};