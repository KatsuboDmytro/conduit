import { createApi } from '@reduxjs/toolkit/query/react';
import { realWorldBaseQuery } from '../../../core/api/real-world-query';
import { GetProfileInDTO } from './dto/get-profile.in';
import { FollowUserInDTO } from './dto/follow-user.in';
import { replaceCachedProfile } from './utils';

interface ProfileParams {
  username: string;
}

interface UpdateProfileParams {
  avatar: string;
  username: string;
  bio: string;
  email: string;
  newPassword: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}`,
        method: 'get',
      }),
    }),

    followUser: builder.mutation<FollowUserInDTO, ProfileParams>({
      query: ({username}) => ({
        url: `/profiles/${username}/follow`,
        method: 'post',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedProfile(getState, queryFulfilled, dispatch, profileApi);
      }
    }),

    unFollowUser: builder.mutation<FollowUserInDTO, ProfileParams>({
      query: ({username}) => ({
        url: `/profiles/${username}/follow`,
        method: 'delete',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedProfile(getState, queryFulfilled, dispatch, profileApi);
      }
    }),
  })
});

export const { 
  useGetProfileQuery, 
  useFollowUserMutation, 
  useUnFollowUserMutation 
} = profileApi;
