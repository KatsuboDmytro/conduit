import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../../common/components/button/button.component';
import { Container } from '../../../common/components/container/container.component';
import { Input } from '../../../common/components/input/input.component';
import { useAuth } from '../../auth/hooks/useAuthState';
import { useUpdateUserMutation } from '../api/repository';
import { TextArea } from '../../../common/text-area/text-area.component';
import { ErrorsList } from '../../../common/components/errors-list.component';

interface SettingsPageProps {}

interface SettingsFormValues {
  avatar: string;
  username: string;
  bio?: string;
  email: string;
  newPassword: string;
}

export const SettingsPage: FC<SettingsPageProps> = () => {
  const auth = useAuth();
  const [triggerUpdateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormValues>({
    defaultValues: {
      avatar: auth.user?.image,
      username: auth.user?.username,
      bio: auth.user?.bio || '',
      email: auth.user?.email,
      newPassword: '',
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await triggerUpdateUser({
        ...values,
        bio: values.bio || '',
      }).unwrap();
      navigate(`/${encodeURIComponent(values.username)}`);
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Container>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <ErrorsList errors={errors} />
        <Input
          placeholder="URL of profile picture"
          {...register('avatar')}
          size="SM"
        />
        <Input placeholder="Username" {...register('username')} />
        <TextArea
          placeholder="Short bio about you"
          {...register('bio')}
          rows={10}
        />
        <Input placeholder="Email" {...register('email')} type="email" />
        <Input
          placeholder="New password"
          {...register('newPassword')}
          type="password"
        />
        <div className="flex justify-end">
          <Button type="submit" btnStyle="GREEN" btnSize="LG">
            Update settings
          </Button>
        </div>
      </form>
    </Container>
  );
};