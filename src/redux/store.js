import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from './slice/toggleBar-slice.js'; 
import  sideBarActiveReducer from './slice/sideBarActive-slice.js'
import scrollBarActiveReducer from './slice/scrollBarActive-slice.js'

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    sideBarActive: sideBarActiveReducer,
    scrollBarActive: scrollBarActiveReducer,
  },
});

export default store;