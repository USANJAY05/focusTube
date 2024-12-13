import { createSlice } from "@reduxjs/toolkit";

const regionSlice = createSlice({
    name : 'region',
    initialState : {
        value : 'IN',
    },
    reducers : {
        setRegion : (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setRegion } = regionSlice.actions;

export default regionSlice.reducer;