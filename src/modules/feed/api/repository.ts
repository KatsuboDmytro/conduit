import { createApi } from '@reduxjs/toolkit/query/react'
import { FeedArticle } from './dto/global-feed.in';
import { FEED_PAGE_SIZE } from '../consts';
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { replaceCachedArticle, transformResponse } from './utils';
import { realWorldBaseQuery } from '../../../core/api/real-world-query';
import { SingleArticleInDTO } from './dto/single-article.in';
import { ArticleCommentsInDTO } from './dto/article-comments.in';
import { FavoriteArticleInDTO } from './dto/favorite-article.in';
import { CreateArticleInDTO } from './dto/create-article.in';
import { CreateArticleOutDTO } from './dto/create-article.out';
import { EditArticleInDTO } from './dto/edit-article.in';
import { EditArticleOutDTO } from './dto/edit-article.out';

interface BaseFeedParams {
  page: number;
}
export interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
  isPersonalFeed: boolean;
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

interface FavoriteArticleParams {
  slug: string;
}

interface CreateArticleParams {
  title: string;
  description: string;
  body: string;
  tags: string;
}

interface DeleteArticleParams {
  slug: string;
}

interface EditArticleParams extends CreateArticleParams {
  slug: string;
}

interface CreateCommentParams {
  articleSlug: string;
  comment: string;
}

interface DeleteCommentParams {
  id: number;
  articleSlug: string;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: realWorldBaseQuery,
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
      keepUnusedDataFor: 1,
      query: ({ page, tag, isPersonalFeed }) => ({
        url: isPersonalFeed ? '/articles/feed' : '/articles', 
        method: 'get',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page + FEED_PAGE_SIZE,
          tag,
        }
      }),
      transformResponse,
      providesTags: result => 
        result ? result?.articles.map(article => ({
          type: 'Article', 
          slug: article.slug, 
      })) : ['Article'],
    }),

    getProfileFeed: builder.query<FeedData, ProfileFeedParams>({
      keepUnusedDataFor: 1,
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
      providesTags: ['Article'],
    }),

    getPopularTags: builder.query<PopularTagsInDTO, any>({
      keepUnusedDataFor: 1,
      query: () => ({
        url: '/tags',
        method: 'get',
      })
    }),

    getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
      keepUnusedDataFor: 1,
      query: ({slug}) => ({
        url: `/articles/${slug}`,
        method: 'get',
      })
    }),

    getCommentsArticle: builder.query<ArticleCommentsInDTO, SingleArticleParams>({
      keepUnusedDataFor: 1,
      query: ({slug}) => ({
        url: `/articles/${slug}/comments`,
        method: 'get',
      })
    }),

    favoriteArticle: builder.mutation<FavoriteArticleInDTO, FavoriteArticleParams>({
      query: ({slug}) => ({
        url: `/articles/${slug}/favorite`,
        method: 'post',
      }),
      invalidatesTags: ['Article'],
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      }
    }),
    
    unFavoriteArticle: builder.mutation<FavoriteArticleInDTO, FavoriteArticleParams>({
      query: ({slug}) => ({
        url: `/articles/${slug}/favorite`,
        method: 'delete',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      }
    }),
    
    createArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
      query: ({title, description, body, tags}) => {
        const data: CreateArticleOutDTO = {
          article: {
            title, 
            description, 
            body, 
            tagList: 
            tags.split(',').map((tag) => tag.trim()),
          },
        };
        return {
          url: '/articles',
          method: 'post',
          data,
        }
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      }
    }),

    editArticle: builder.mutation<EditArticleInDTO, EditArticleParams>({
      query: ({title, description, body, tags, slug}) => {
        const data: EditArticleOutDTO = {
          article: {
            title, 
            description, 
            body, 
            tagList: 
            tags.split(',').map((tag) => tag.trim()),
          },
        };
        return {
          url: `/articles/${slug}`,
          method: 'put',
          data,
        }
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      }
    }),
    
    deleteArticle: builder.mutation<any, DeleteArticleParams>({
      query: ({slug}) => {
        return {
          url: `/articles/${slug}`,
          method: 'delete',
        };
      },
    }),
  }),
})

export const { 
  useGetGlobalFeedQuery, 
  useGetPopularTagsQuery, 
  useGetProfileFeedQuery,
  useGetSingleArticleQuery,
  useGetCommentsArticleQuery,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
} = feedApi;