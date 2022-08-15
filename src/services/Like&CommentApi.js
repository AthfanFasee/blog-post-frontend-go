import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://blog-posts-1699.herokuapp.com/api/v1/posts'
const token = localStorage.getItem('token');


const likeAndCommentApi = createApi({
  reducerPath: 'likeAndCommentApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({

    addLike: builder.mutation({
      query: ({postID, userID}) => ({
        url: `/liked/${postID}`,
        method: 'PATCH',
        body: {id: userID},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),

    disLike: builder.mutation({
      query: ({postID, userID}) => ({
        url: `/disliked/${postID}`,
        method: 'PATCH',
        body: {id: userID},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),

    fetchComments: builder.query({
      query: ({postID}) => `/comments/${postID}`,
    }),
    
    addComment: builder.mutation({
      query: ({commentInput, id}) => ({
        url: `/comments`,
        method: 'POST',
        body: {Text:commentInput, Post:id},
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({id}) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
    }),
  }),
});

export default likeAndCommentApi;

export const {
  useAddLikeMutation,
  useDisLikeMutation,
  useLazyFetchCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation
} = likeAndCommentApi;
