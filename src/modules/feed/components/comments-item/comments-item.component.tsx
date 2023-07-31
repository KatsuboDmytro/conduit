import { FC } from 'react';
import { ArticleMeta } from '../index';
import { Author } from '../../api/dto/global-feed.in';

interface CommentsItemProps {
  body: string;
  author: Author;
  publishedAt: string;
}

export const CommentsItem: FC<CommentsItemProps> = ({
  body,
  author,
  publishedAt,
}) => {
  return (
    <div className='max-w-3xl mx-auto mt-16 flex flex-col gap-3'>
      <div className='border border-conduit-borderComment rounded'>
        <p className='p-5'>{body}</p>
      </div>
      <div className='border-t border-conduit-borderComment bg-conduit-150 py-3 px-5'>
        <ArticleMeta
          authorNameStyle='GREEN' 
          author={author}
          showActionButton={false}
          publishedAt={publishedAt}
          authorDirection='ROW'
          authorNameSize='SM' />
      </div>
    </div>
  );
}