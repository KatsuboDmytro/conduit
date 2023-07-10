// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../core/axios-base-query'
import { GlobalFeedInDTO } from './dto/global-feed.in';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<GlobalFeedInDTO, any>({
      query: () => ({
        url: '/articles',
        method: 'get',
      }),
    }),
  }),
})

export const { useGetGlobalFeedQuery } = feedApi;