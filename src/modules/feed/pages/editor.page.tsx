import { FC, useEffect } from 'react';
import { Container, Input } from '../../../common/components';
import { useForm } from 'react-hook-form';
import { MDEditorHookForm } from '../../../common/components/mdeditor-hook-form/mdeditor-hook-form.component';
import * as yup from 'yup';
import { Button } from '../../../common/components/button/button.component';
import { useCreateArticleMutation, useEditArticleMutation, useGetSingleArticleQuery } from '../api/repository';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { ErrorsList } from '../../../common/components/errors-list.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateArticleInDTO } from '../api/dto/create-article.in';
import { EditArticleInDTO } from '../api/dto/edit-article.in';

interface EditorPageProps {}

interface EditorFormValues {
  title: string;
  description: string;
  body: string;
  tags?: string;
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
});

export const EditorPage: FC<EditorPageProps> = () => {
  const [triggerCreateArticle] = useCreateArticleMutation();
  const [triggerEditArticle] = useEditArticleMutation();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: {isSubmitting, errors}, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const {slug} = useParams();
  const {data, isLoading} = useGetSingleArticleQuery({slug: String(slug)}, {skip: !Boolean(slug)});

  useEffect(() => {
    if(!data) {
      return;
    }

    reset({
      title: data.article.title,
      description: data.article.description,
      body: data.article.body,
      tags: data.article.tagList.join(', '),
    })
  
  }, [data])
  

  const onSubmit = async (values: EditorFormValues) => {
    try {
      let data: CreateArticleInDTO | EditArticleInDTO;
      if(slug) {
        data = await triggerEditArticle({
          ...values,
          tags: values.tags || '' , 
          slug
        }).unwrap();
      } else {
        data = await triggerCreateArticle({
          ...values,
          tags: values.tags || '',
        }).unwrap();
      }
      navigate(`/article/${data.article.slug}`);
    } catch (e) {
      toast.error('Something went wrong. Please try again later');
    }
  };
  

  if(slug && isLoading) {
    return <p>Is Loading...</p>;
  }
  
  return (
    <Container>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <ErrorsList errors={errors}  />
        <Input placeholder='Article title' {...register('title')}/>
        <Input 
          placeholder="What's the article about" 
          {...register('description')}
          size='SM'
        />
        <MDEditorHookForm control={control} name={'body'} />
        <Input 
          placeholder='Enter tags' 
          {...register('tags')}
          size='SM'
        />
        <div className="flex justify-end">
          <Button 
            btnSize='LG' 
            btnStyle='GREEN'
            type='submit'
            disabled={isSubmitting}
          >
            Publish article
          </Button>
        </div>
      </form>
    </Container>
  );
}