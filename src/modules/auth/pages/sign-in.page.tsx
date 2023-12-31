import { FC } from 'react';
import * as yup from 'yup';
import { Container, Input } from '../../../common/components';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../../../common/components/button/button.component';
import { useAuth } from '../hooks/useAuthState';
import { ErrorsList } from '../../../common/components/errors-list.component';

interface SignInPageProps {}

interface SignInFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const SignInPage: FC<SignInPageProps> = () => {
  const { signIn } = useAuth();
  
  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      navigate('/');
    } catch(e) {
      toast.error('Something went wrong. Pease try again later');
    }
  }

  return (
    <Container>
      <h1 className='text-4xl text-center mb-4'>Sign in</h1>
      <form 
        className='max-w-xl mx-auto' 
        onSubmit={handleSubmit(onSubmit)} 
        noValidate
      >
        <ErrorsList errors={formState.errors} />
        <Input placeholder='Email' type='email' {...register('email')} />
        <Input placeholder='Password' type='password' {...register('password')} />
        <div className="flex justify-end">
          <Button 
            btnStyle={'GREEN'} 
            btnSize={'LG'} 
            type={'submit'} 
            disabled={formState.isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
    </Container>
  );
}