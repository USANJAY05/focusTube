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
    setToggle: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { toggle, setToggle } = toggleBarSlice.actions;

export default toggleBarSlice.reducer;