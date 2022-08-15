import {createSlice} from '@reduxjs/toolkit';

const initialStateValues = { newtitle: "", newpostText: ""}

export const updateInputValuesSlice = createSlice({
    name: 'update',
    //to save data of update post input elements
    initialState : { value: initialStateValues},  
    reducers: {
        updateInputValue: (state,action) => {
            state.value = action.payload;
        }
    }
})

export const {updateInputValue} = updateInputValuesSlice.actions;
export default updateInputValuesSlice.reducer;