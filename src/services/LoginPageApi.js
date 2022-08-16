import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const URL = process.env.REACT_APP_API_PATH + '/api/v1/auth'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query: ({loginEmail, loginPassword}) => ({
        url: `/login`,
        method: 'POST',
        body: {email: loginEmail, password: loginPassword},
      }),
    }),

    registerUser: builder.mutation({
      query: ({registerEmail, registerPassword, registerUserName}) => ({
        url: `/register`,
        method: 'POST',
        body: {email: registerEmail, password: registerPassword, name: registerUserName},
      }),
    }),
  }),
});

export default authApi;

export const {
  useLoginUserMutation,
  useRegisterUserMutation
} = authApi;


