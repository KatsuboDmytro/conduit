import { FC } from 'react';
import { CommentsItem } from '../index';
import { useParams } from 'react-router-dom';
import { useGetCommentsArticleQuery } from '../../api/repository';
import { NewComments } from '../new-comment/new-comment.component';

interface CommentsListProps {}

export const CommentsList: FC<CommentsListProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetCommentsArticleQuery({slug: slug!})
  
  if(isLoading) {
    return <p>Loading comments...</p>
  }

  if(data?.comments.length === 0) {
    return (
      <div className='max-w-3xl mx-auto mt-16 flex flex-col gap-3'>
        <NewComments slug={slug!} />      
        <p>No comments was found</p>
      </div>
    )
  }
  
  return (
    <div className='max-w-3xl mx-auto mt-16 flex flex-col gap-3'>
      <NewComments slug={slug!} />      
      {data?.comments.map((comment) => (
        <CommentsItem 
        key={comment.id} 
        body={comment.body}
        author={comment.author}
        publishedAt={comment.createdAt}
        slug={slug!}
        commentId={comment.id} />
      ))}
    </div>
  );
}