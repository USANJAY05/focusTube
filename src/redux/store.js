import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from './slice/toggleBar-slice.js'; 
import  sideBarActiveReducer from './slice/sideBarActive-slice.js'

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    sideBarActive: sideBarActiveReducer,
  },
});

export default store;