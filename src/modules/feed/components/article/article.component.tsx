import { FC } from 'react';
import { Link } from 'react-router-dom'
import { ArticleAuthor, FavouriteButton, TagList } from '../index';
import { FeedArticle } from '../../api/dto/global-feed.in';
import { DateTime } from 'luxon';

interface ArticleProps extends FeedArticle {}

export const Article: FC<ArticleProps> = ({ author, createdAt, favoritesCount, title, description, tagList, slug }) => {
  return (
    <article>
      <div className="border-t border-black/10 py-6">
        <div className="mb-4 font-light flex justify-between">
          <ArticleAuthor author={author} createdAt={createdAt}/>
          <FavouriteButton count={favoritesCount} />
        </div>

        <Link to={`/article/${encodeURIComponent(slug)}`} className='hover:no-underline'>
          <h1 className='mb-1 font-semibold text-2xl text-conduit-darkestGray'>
            {title}
          </h1>
          <p className='text-conduit-darkenGray font-light mb-1'>
            {description}
          </p>
          <div className="flex justify-between">
            <span className='text-conduit-gray text-date font-light'>Read more...</span>
            <TagList list={tagList} itemStyle='LIGHT' />
          </div>
        </Link>
      </div>
    </article>
  )
}