import { FC } from 'react';
import { Link } from 'react-router-dom'
import { FavouriteButton, TagList } from '../index';
import { FeedArticle } from '../../api/dto/global-feed.in';
import { DateTime } from 'luxon';

interface ArticleProps extends FeedArticle {}

export const Article: FC<ArticleProps> = ({ author, createdAt, favoritesCount, title, description, tagList }) => {
  return (
    <article>
      <div className="border-t border-black/10 py-6">
        <div className="mb-4 font-light flex justify-between">
          <div className='flex'>
            <Link to={`/@${author.username}`}>
              <img src={author.image} alt={`${author.username} avatar`}
              className='inline-block h-8 w-8 rounded-full' />
            </Link>
            <div className='mr-6 ml-0.3 inline-block leading-4 inline-flex flex-col'>
              <Link to={`/@${author.username}`} className='font-medium '>
                {author.username}
              </Link>
              <span className='text-conduit-gray text-date'>
                {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
              </span>
            </div>
          </div>
          <FavouriteButton count={favoritesCount} />
        </div>

        <Link to={"/article/qwert"} className='hover:no-underline'>
          <h1 className='mb-1 font-semibold text-2xl text-conduit-darkestGray'>
            {title}
          </h1>
          <p className='text-conduit-darkenGray font-light mb-1'>
            {description}
          </p>
          <div className="flex justify-between">
            <span className='text-conduit-gray text-date font-light'>Read more...</span>
            <TagList list={tagList}/>
          </div>
        </Link>
      </div>
    </article>
  )
}