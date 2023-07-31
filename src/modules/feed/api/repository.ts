import { createApi } from '@reduxjs/toolkit/query/react'
import { FeedArticle } from './dto/global-feed.in';
import { FEED_PAGE_SIZE } from '../consts';
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { transformResponse } from './utils';
import { realWorldBaseQuery } from '../../../core/api/real-world-query';
import { SingleArticleInDTO } from './dto/single-article.in';
import { ArticleCommentsInDTO } from './dto/article-comments.in';

interface BaseFeedParams {
  page: number;
}
interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
}

export interface FeedData {
  articles: FeedArticle[];
  articlesCount: number;
}

interface ProfileFeedParams extends BaseFeedParams {
  author: string;
  isFavorite?: boolean;
}

interface SingleArticleParams {
  slug: string;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
      query: ({ page, tag }) => ({
        url: '/articles', 
        method: 'get',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page + FEED_PAGE_SIZE,
          tag,
        }
      }),
      transformResponse,
    }),

    getProfileFeed: builder.query<FeedData, ProfileFeedParams>({
      query: ({ page, author, isFavorite=false }) => ({
        url: '/articles',
        method: 'get',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          author: isFavorite ? undefined : author,
          favorited: !isFavorite ? undefined : author,
        },
      }),
      transformResponse,
    }),

    getPopularTags: builder.query<PopularTagsInDTO, any>({
      query: () => ({
        url: '/tags',
        method: 'get',
      })
    }),

    getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
      query: ({slug}) => ({
        url: `/articles/${slug}`,
        method: 'get',
      })
    }),

    getCommentsArticle: builder.query<ArticleCommentsInDTO, SingleArticleParams>({
      query: ({slug}) => ({
        url: `/articles/${slug}/comments`,
        method: 'get',
      })
    })
  }),
})


export const { 
  useGetGlobalFeedQuery, 
  useGetPopularTagsQuery, 
  useGetProfileFeedQuery,
  useGetSingleArticleQuery,
  useGetCommentsArticleQuery,
} = feedApi;