import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import toggleReducer from './slice/toggleBar-slice.js';
import sideBarActiveReducer from './slice/sideBarActive-slice.js';
import scrollBarActiveReducer from './slice/scrollBarActive-slice.js';
import profileReducer from './slice/profile-slice.js';

// Persist configuration for the profile slice
const profilePersistConfig = {
  key: 'profile',
  storage, // Use localStorage
};

// Combine all reducers
const rootReducer = combineReducers({
  toggle: toggleReducer,
  sideBarActive: sideBarActiveReducer,
  scrollBarActive: scrollBarActiveReducer,
  profile: persistReducer(profilePersistConfig, profileReducer), // Persist the profile slice
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

// Export the persistor
export const persistor = persistStore(store);

export default store;
