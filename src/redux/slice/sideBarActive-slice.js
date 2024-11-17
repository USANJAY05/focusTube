import { createSlice } from "@reduxjs/toolkit";

const sideBarActiveSlice = createSlice({
    name: 'sideBarActive',
    initialState: {
        value: 'Home'
    },
    reducers: {
        setSideActive: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setSideActive } = sideBarActiveSlice.actions;

export default sideBarActiveSlice.reducer;