import { createSlice } from "@reduxjs/toolkit";

const scrollBarActiveSlice = createSlice({
    name: 'scrollBarActive',
    initialState: {
        value: 1
    },
    reducers: {
        setScrollActive: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setScrollActive } = scrollBarActiveSlice.actions;

export default scrollBarActiveSlice.reducer;