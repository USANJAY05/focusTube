import { createSlice } from "@reduxjs/toolkit";

const toggleThemeSlice = createSlice({
    name : 'ToggleTheme',
    initialState : {
        value : 'light',
    },
    reducers : {
        setTheme: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setTheme } = toggleThemeSlice.actions;

export default toggleThemeSlice.reducer;