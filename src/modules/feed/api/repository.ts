// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../core/axios-base-query'
import { GlobalFeedInDTO } from './dto/global-feed.in';
import { FEED_PAGE_SIZE } from '../consts';

interface GlobalFeedParams {
  page: number;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<GlobalFeedInDTO, GlobalFeedParams>({
      query: ({ page }) => ({
        url: '/articles',
        method: 'get',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page + FEED_PAGE_SIZE,
        }
      }),
    }),
  }),
})

export const { useGetGlobalFeedQuery } = feedApi;