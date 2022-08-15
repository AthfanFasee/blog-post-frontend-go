import {createSlice} from '@reduxjs/toolkit';
import postsApi from '../services/PostsApi';

export const postsSlice = createSlice({
    name: 'UpdatedPost',
    initialState : {value: {     
    }},
    extraReducers: (builder) => {
        builder.addMatcher(
            postsApi.endpoints.updatePost.matchFulfilled,
          (state, { payload }) => {
            state.value = payload.post
          }
        )
      },
      
})

export default postsSlice.reducer;