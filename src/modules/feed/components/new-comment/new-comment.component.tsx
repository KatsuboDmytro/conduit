import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../auth/hooks/useAuthState';
import { TextArea } from '../../../../common/text-area/text-area.component';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../../common/components/button/button.component';
import { useCreateCommentMutation } from '../../api/repository';
import { toast } from 'react-toastify';

interface NewCommentsProps {
  slug: string;
}
interface NewCommentsFormValues {
  comment: string;
}

const validationSchema = yup.object({
  comment: yup.string().required(),
});

export const NewComments: FC<NewCommentsProps> = ({slug}) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [triggerCreateComment] = useCreateCommentMutation();
  const { register, handleSubmit, formState: { isSubmitting}} = useForm({
    defaultValues:{
      comment: '',
    },
    resolver: yupResolver(validationSchema),
  });

  if(auth.isLoggedIn) {
    return null;
  }
  
  if(!auth.isLoggedIn) {
    return (
      <p>
        <Link to='/sign-in'>Sign in</Link>
         or 
         <Link to='/sign-up'>sign up</Link> 
         to add comments on this article.
      </p>
    )
  }

  const onSubmit = async (values: NewCommentsFormValues) => {
    try {
      await triggerCreateComment({articleSlug: slug, comment: values.comment});
      navigate('/');
    } catch(e) {
      toast.error('Something went wrong. Pease try again later');
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-conduit-gray-250 rounded"
    >
      <TextArea
        placeholder="Leave your comment"
        {...register('comment')}
        noBorder
        size="SM"
        rows={4}
        className="py-3 px-6"
      />
      <div className="border-t border-conduit-gray-250 bg-conduit-gray-150 py-3 px-5 flex justify-between items-center">
        <img
          src={auth.user?.image}
          alt={`${auth.user?.username} avatar`}
          className="w-8 h-8 rounded-full inline mr-2"
        />
        <Button type="submit" btnStyle="GREEN" disabled={isSubmitting}>
          Post comment
        </Button>
      </div>
    </form>
  );

}
