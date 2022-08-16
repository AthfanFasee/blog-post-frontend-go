import {createSlice} from '@reduxjs/toolkit';

export const userIDSlice = createSlice({
    name: 'Params',
    //The reason for global store is, all of these params are used in profile button as well
    initialState : {value : {userId: "", page: 1, sort: "-id"}},
    reducers: {
        updateUserIDParam: (state,action) => {
            state.value.userId = action.payload;
        },
        updatePageParam: (state,action) => {
            state.value.page = action.payload;
        },
        updateSortParam: (state,action) => {
            state.value.sort = action.payload;
        },
    }
})

export const {updateUserIDParam, updatePageParam, updateSortParam} = userIDSlice.actions;
export default userIDSlice.reducer;