import { FC } from 'react';
import { ArticleBanner, TagList, ArticleMeta, CommentsList } from '../components';
import { Container } from '../../../common/components';
import { useGetSingleArticleQuery } from '../api/repository';
import { useParams } from 'react-router';

interface ArticlePageProps {}

const convertNewLines = (body: string) => {
  return body.split('\\n').join('<br />');
}

export const ArticlePage: FC<ArticlePageProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetSingleArticleQuery({slug : slug!});

  if(isLoading) {
    return null;
  }

  if(!data) {
    return <h1>Article not found</h1>
  }

  return (
    <div>
      <ArticleBanner 
        title={data.article.title}
        author={data.article.author}
        likes={data.article.favoritesCount} 
        publishedAt={data.article.createdAt}
        slug={slug!} 
        isFavorited={data.article.favorited} 
      />

      <Container>
        <div className="pb-8 border-b mb-6">
          <p className='text-articleBody leading-articleBody font-sourceSerif mb-4'
            dangerouslySetInnerHTML={{__html: convertNewLines(data.article.body)}}>
          </p>
          <TagList list={data.article.tagList} />
        </div>
        <div className='flex justify-center'>
          <ArticleMeta 
            authorNameStyle='GREEN' 
            author={data.article.author}
            slug={slug!}
            likes={data.article.favoritesCount} 
            publishedAt={data.article.createdAt}
            isFavorited={data.article.favorited}
          />
        </div>

        <CommentsList />
      </Container>
    </div>
  );
};