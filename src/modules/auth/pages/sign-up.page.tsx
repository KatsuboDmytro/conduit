import { FC } from 'react';
import * as yup from 'yup';
import { Container, Input } from '../../../common/components';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../../../common/components/button/button.component';
import { useAuth } from '../hooks/useAuthState';
import { ErrorsList } from '../../../common/components/errors-list.component';

interface SignUpPageProps {}

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const SignUpPage: FC<SignUpPageProps> = () => {
  const { signUp } = useAuth();
  
  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signUp(values);
      navigate('/');
    } catch(e) {
      toast.error('Something went wrong. Pease try again later');
    }
  }

  return (
    <Container>
      <h1 className='text-4xl text-center mb-4'>Sign up</h1>
      <p className="text-center">
        <Link to="/sign-in">Have an account?</Link>
      </p>
      <form 
        className='max-w-xl mx-auto' 
        onSubmit={handleSubmit(onSubmit)} 
        noValidate
      >
        <ErrorsList errors={formState.errors} />
        <Input placeholder='Username' {...register('username')} />
        <Input placeholder='Email' type='email' {...register('email')} />
        <Input placeholder='Password' type='password' {...register('password')} />
        <div className="flex justify-end">
          <Button 
            btnStyle={'GREEN'} 
            btnSize={'LG'} 
            type={'submit'} 
            disabled={formState.isSubmitting}
          >
            Sign up
          </Button>
        </div>
      </form>
    </Container>
  );
}