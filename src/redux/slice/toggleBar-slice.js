import { createSlice } from "@reduxjs/toolkit";

const toggleBarSlice = createSlice({
  name: "toggleBar",
  initialState: {
    value: true,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value; 
    },
  },
});

export const { toggle } = toggleBarSlice.actions;

export default toggleBarSlice.reducer;