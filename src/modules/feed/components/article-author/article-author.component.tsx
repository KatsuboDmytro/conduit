import { FC } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { Author } from '../../api/dto/global-feed.in';
import clsx from 'clsx';

export enum NameStyleEnum {
  GREEN = 'GREEN',
  LIGHT = 'LIGHT',
}

enum MetaDirectionEnum {
  ROW = 'ROW',
  COL = 'COL',
}

enum NameSizeEnum {
  BASE = "BASE",
  SM = "SM",
}

interface ArticleAuthorProps {
  author: Author;
  publishedAt: string;
  nameStyle?: keyof typeof NameStyleEnum;
  direction?: keyof typeof MetaDirectionEnum;
  nameSize?: keyof typeof NameSizeEnum;
}

export const ArticleAuthor: FC<ArticleAuthorProps> = ({ 
  author, 
  publishedAt, 
  nameStyle = NameStyleEnum.GREEN,
  direction = MetaDirectionEnum.COL,
  nameSize = NameSizeEnum.BASE,
}) => {

  const usernameClasses = clsx('font-medium', {
    'text-white hover:text-white': nameStyle === NameStyleEnum.LIGHT,
    'text-date': nameSize === NameSizeEnum.SM,
  })

  const metaClasses = clsx('mr-6 ml-0.3 leading-4 inline-flex', {
    'flex-col': direction === MetaDirectionEnum.COL,
    'flex-row items-center gap-2': direction === MetaDirectionEnum.ROW,
  })

  const imageClasses = clsx('inline-block h-8 w-8 rounded-full', {
    'h-8 w-8': nameSize === NameSizeEnum.BASE,
    'h-5 w-5': nameSize === NameSizeEnum.SM,
  })

  return (
    <div className='flex'>
      <Link to={`/${encodeURIComponent(author.username)}`}>
        <img src={author.image} alt={`${author.username} avatar`}
        className={imageClasses} />
      </Link>
      <div className={metaClasses}>
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