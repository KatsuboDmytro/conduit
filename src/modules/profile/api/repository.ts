import { createApi } from '@reduxjs/toolkit/query/react';
import { realWorldBaseQuery } from '../../../core/api/real-world-query';
import { GetProfileInDTO } from './dto/get-profile.in';
import { FollowUserInDTO } from './dto/follow-user.in';
import { replaceCachedProfile } from './utils';
import { UpdateUserInDTO } from './dto/update-user.in';
import { UpdateUserOutDTO } from './dto/update-user.out';
import { RootState } from '../../../store/store';
import { setUser } from '../../auth/service/slice';

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

    updateUser: builder.mutation<UpdateUserInDTO, UpdateProfileParams>({
      query: ({email, username, bio, avatar, newPassword}) => {
        const data: UpdateUserOutDTO = {
          user: {
            email, 
            username, 
            bio, 
            image: avatar, 
          },
        };

        if(newPassword) {
          data.user.password = newPassword;
        }

        return {
          url: `/user`,
          method: 'put',
          data,
        }
      },
      onQueryStarted: async (
        { email, username, bio, avatar },
        { dispatch, queryFulfilled, getState }
      ) => {
        const state = getState() as RootState;
        await queryFulfilled;

        await dispatch(
          setUser({
            token: state.auth.user!.token,
            email,
            username,
            bio,
            image: avatar,
          })
        );
      },
    }),
  })
});

export const { 
  useGetProfileQuery, 
  useFollowUserMutation, 
  useUnFollowUserMutation,
  useUpdateUserMutation
} = profileApi;
