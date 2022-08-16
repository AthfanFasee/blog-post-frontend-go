import {configureStore} from '@reduxjs/toolkit';
import updateInputValuesReducer from '../features/UpdateInputValues';
import updatePostID from '../features/PostID';
import updateParams from '../features/Params';
import UpdatePostReducer from '../features/UpdatedPost';
import postsApi from '../services/PostsApi';
import authApi from '../services/LoginPageApi';
import likeAndCommentApi from '../services/Like&CommentApi';

export const store = configureStore({
    reducer: {
      [postsApi.reducerPath] : postsApi.reducer,
      [authApi.reducerPath] : authApi.reducer,
      [likeAndCommentApi.reducerPath] : likeAndCommentApi.reducer,
      UpdatedInputValues: updateInputValuesReducer,
      PostID: updatePostID,
      Params: updateParams,
      updatePost : UpdatePostReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, authApi.middleware, likeAndCommentApi.middleware)
  });


