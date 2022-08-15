import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://blog-posts-1699.herokuapp.com/api/v1'
const token = localStorage.getItem('token');


const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({

    getPosts: builder.query({
      query: ({page, sort, UserIDParam }) => `/posts?page=${page}&sort=${sort}${UserIDParam}`,
      providesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Post'],
    }),

    createPost: builder.mutation({
      query: ({title, postText, img}) => ({
        url: `/posts`,
        method: 'POST',
        body: {title, postText, img},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Post'],
    }),
    
    updatePost: builder.mutation({
      query: ({PostID, UpdateInputValue}) => ({
        url: `/posts/${PostID}`,
        method: 'PATCH',
        body: {title: UpdateInputValue.newtitle, postText: UpdateInputValue.newpostText, img:UpdateInputValue.newImgURL},
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
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation
} = postsApi;
