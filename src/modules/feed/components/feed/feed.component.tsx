import { FC, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ArticleList, FeedToggle } from '../index';
import { Container } from '../../../../common/components';
import { useGetGlobalFeedQuery } from '../../api/repository';
import { FEED_PAGE_SIZE } from '../../consts';
import { useSearchParams } from 'react-router-dom';
import { serializeSearchParams } from '../../../../utils/router';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') ? Number(searchParams.get('page')) : 0);
  const onHandlePageChange = ({selected}: {selected: number}) => {
    setPage(selected);
    setSearchParams(serializeSearchParams({ page: String(selected) }));
  }

  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({ page });

  if(isLoading || isFetching){
    return (
      <Container>
        Feed is loading...
      </Container>
    )
  }

  if(error){
    return (
      <Container>
        Error while loading feed.
      </Container>
    )
  }

  return (
    <Container>
      <FeedToggle />
      <div className='flex'>
        <div className="w-3/4">
          <ArticleList list={data?.articles || []} />
          <nav className="my-8">
            <ReactPaginate
              pageCount={(data?.articlesCount || 0) / FEED_PAGE_SIZE} 
              pageRangeDisplayed={(data?.articlesCount || 0) / FEED_PAGE_SIZE} 
              previousLabel={null}
              nextLabel={null}
              containerClassName='flex'
              pageClassName='group'
              pageLinkClassName='p-3 text-conduit-green bg-white border border-conduit-lightenGray -ml-px 
                hover:bg-conduit-pageHoverBg group-[&:nth-child(2)]:rounded-l group-[&:nth-child(2)]:rounded-r'
              activeClassName='active group'
              activeLinkClassName='group-[.active]:bg-conduit-green group-[.active]:text-white group-[.active]:border-conduit-green'
              onPageChange={onHandlePageChange}
              forcePage={page}
            />
          </nav>
        </div>
        <div className='w-1/4'>tags</div>
      </div>
    </Container>
  )
}