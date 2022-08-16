import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = process.env.REACT_APP_API_PATH + '/api/v1/posts'
const token = localStorage.getItem('token');


const likeAndCommentApi = createApi({
  reducerPath: 'likeAndCommentApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({

    addLike: builder.mutation({
      query: ({postID, userID}) => ({
        url: `/like/${postID}`,
        method: 'PATCH',
        body: {id: userID},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),

    disLike: builder.mutation({
      query: ({postID, userID}) => ({
        url: `/dislike/${postID}`,
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
      query: ({commentInput, postID}) => ({
        url: `/comment`,
        method: 'POST',
        body: {text:commentInput, post:postID},
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({id}) => ({
        url: `/comment/${id}`,
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
