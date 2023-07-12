import { createApi } from '@reduxjs/toolkit/query/react';
import { realWorldBaseQuery } from '../../../core/api/real-world-query';
import { GetProfileInDTO } from './dto/get-profile.in';

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
  })
});

export const { useGetProfileQuery } = profileApi;
