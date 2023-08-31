import { FC } from 'react';
import { Author } from '../../api/dto/global-feed.in';
import { CommentMeta } from '../comment-meta/comment-meta.component';

interface CommentsItemProps {
  body: string;
  author: Author;
  publishedAt: string;
  slug: string;
  commentId: number;
}

export const CommentsItem: FC<CommentsItemProps> = ({
  body,
  author,
  publishedAt,
  slug,
  commentId,
}) => {
  return (
    <div className='max-w-3xl mx-auto mt-16 flex flex-col gap-3'>
      <div className='border border-conduit-borderComment rounded'>
        <p className='p-5'>{body}</p>
      </div>
      <div>
        <CommentMeta
          authorNameStyle='GREEN' 
          author={author}
          publishedAt={publishedAt}
          authorDirection='ROW'
          authorNameSize='SM'
          slug={slug} 
          commentId={commentId} />
      </div>
    </div>
  );
}