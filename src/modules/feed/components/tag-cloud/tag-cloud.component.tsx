import { FC } from 'react';
import { TagList } from '../tag-list/tag-list.component';
import { useGetPopularTagsQuery } from '../../api/repository';

interface TagCloudProps {}

export const TagCloud: FC<TagCloudProps> = () => {
  const { data, error, isLoading, isFetching } = useGetPopularTagsQuery('');

  if(isLoading || isFetching){
    return (
      <div className='bg-conduit-tagCloud p-3 pt-1.5'>
        <span className='mb-2'>Loading popular tags...</span>
      </div>
    )
  }

  if(error){
    return (
      <div className='bg-conduit-tagCloud p-3 pt-1.5'>
        <span className='mb-2'>Error while loading popular tags.</span>
      </div>
    )
  }

  return (
    <div className='bg-conduit-tagCloud p-3 pt-1.5'>
      <span className='mb-2'>Popular tags</span>
      <TagList list={data!.tags} itemStyle='DARK' />
    </div>
  )
}