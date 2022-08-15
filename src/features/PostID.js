import {createSlice} from '@reduxjs/toolkit';

export const postIDSlice = createSlice({
    name: 'update',
    //to save the curren post's ID (Used while updating the post)
    initialState : {value: ""},
    reducers: {
        updatePostID: (state,action) => {
            state.value = action.payload;
        }
    }
})

export const {updatePostID} = postIDSlice.actions;
export default postIDSlice.reducer;