import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
    name : 'profile',
    initialState: {
        name : null,
        email : null,
        img : null,
    },
    reducers : {
        setProfile: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.img = action.payload.img;
        },
        setLogout: (state) => {
            state.name = null;
            state.email = null;
            state.img = null;
        },
    }
})

export const { setProfile, setLogout } = profile.actions;

export default profile.reducer;