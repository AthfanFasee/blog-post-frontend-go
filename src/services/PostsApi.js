import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = process.env.REACT_APP_API_PATH + '/api/v1'

const token = localStorage.getItem('token');


const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({

    getPosts: builder.query({
      query: ({page, sort, UserID}) => `/posts?page=${page}&sort=${sort}&id=${UserID}`,
      providesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Post'],
    }),

    createPost: builder.mutation({
      query: ({title, postText, img, readTime}) => ({
        url: `/post`,
        method: 'POST',
        body: {title, postText, img, readTime},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Post'],
    }),
    
    updatePost: builder.mutation({
      query: ({PostID, UpdateInputValue}) => ({
        url: `/post/${PostID}`,
        method: 'PATCH',
        body: {title: UpdateInputValue.newtitle, postText: UpdateInputValue.newpostText, img:UpdateInputValue.newImgURL, readTime: UpdateInputValue.newreadTime + " mins"},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),

  }),
});

export default postsApi;

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation
} = postsApi;
