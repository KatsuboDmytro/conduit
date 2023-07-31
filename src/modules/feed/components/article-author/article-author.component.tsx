import { FC } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { Author } from '../../api/dto/global-feed.in';
import clsx from 'clsx';

export enum NameStyleEnum {
  GREEN = 'GREEN',
  LIGHT = 'LIGHT',
}

interface ArticleAuthorProps {
  author: Author;
  publishedAt: string;
  nameStyle?: keyof typeof NameStyleEnum;
}

export const ArticleAuthor: FC<ArticleAuthorProps> = ({ author, publishedAt, nameStyle=NameStyleEnum.GREEN }) => {
  const usernameClasses = clsx('font-medium', {
    'text-white hover:text-white': nameStyle === NameStyleEnum.LIGHT,
  })

  return (
    <div className='flex'>
      <Link to={`/${encodeURIComponent(author.username)}`}>
        <img src={author.image} alt={`${author.username} avatar`}
        className='inline-block h-8 w-8 rounded-full' />
      </Link>
      <div className='mr-6 ml-0.3 inline-block leading-4 inline-flex flex-col'>
        <Link to={`/${encodeURIComponent(author.username)}`} className={usernameClasses}>
          {author.username}
        </Link>
        <span className='text-conduit-gray text-date'>
          {DateTime.fromISO(publishedAt).toLocaleString(DateTime.DATE_FULL)}
        </span>
      </div>
    </div>
  );
};