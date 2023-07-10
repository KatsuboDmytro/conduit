import { FC } from 'react';
import { Link } from 'react-router-dom'
import { FavouriteButton, TagList } from '../index';

interface ArticleProps {}

export const Article: FC<ArticleProps> = () => {
  return (
    <article>
      <div className="border-t border-black/10 py-6">
        <div className="mb-4 font-light flex">
          <Link to={'/@dmytro'}>
            <img src="https://api.realworld.io/images/demo-avatar.png" alt="dmytro avatar"
            className='inline-block h-8 w-8 rounded-full' />
          </Link>
          <div className='mr-6 ml-0.3 inline-block leading-4 inline-flex flex-col'>
            <Link to={'/@dmytro'} className='font-medium '>
              Dmytro Katsubo
            </Link>
            <span className='text-conduit-gray text-date'>October 23</span>
          </div>
          <FavouriteButton />
        </div>

        <Link to={"/article/qwert"} className='hover:no-underline'>
          <h1 className='mb-1 font-semibold text-2xl text-conduit-darkestGray'>
            Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!
          </h1>
          <p className='text-conduit-darkenGray font-light mb-1'>
            Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.
          </p>
          <div className="flex justify-between">
            <span className='text-conduit-gray text-date font-light'>Read more...</span>
            <TagList />
          </div>
        </Link>
      </div>
    </article>
  )
}