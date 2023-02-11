import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuthTokenToStorage } from '../../../utils/auth';
import { UserResponse } from '../types';
import { authActions } from './authSlice';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/user' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      {
        authToken: string;
      },
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
      // transformResponse: (response) =>
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log('onQueryStarted');
        try {
          const response = await queryFulfilled;
          const { authToken } = response.data;

          setAuthTokenToStorage(authToken);

          dispatch(authActions.setAuthToken(authToken));

          await dispatch(
            authApi.endpoints.authUser.initiate({
              authToken,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    authUser: builder.query<UserResponse, { authToken?: string }>({
      query({ authToken }) {
        return {
          url: '/auth',
          headers: {
            'x-access-token': authToken,
          },
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(authActions.setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useAuthUserQuery } = authApi;
