import {createSlice} from '@reduxjs/toolkit';

export const userIDSlice = createSlice({
    name: 'userIDParam',
    //to save the curren User's ID with id param as `id=${userID}` (Used while filtering only the logged in user's posts in profile button)
    initialState : {value : ""},
    reducers: {
        updateUserIDParam: (state,action) => {
            state.value = action.payload;
        }
    }
})

export const {updateUserIDParam} = userIDSlice.actions;
export default userIDSlice.reducer;