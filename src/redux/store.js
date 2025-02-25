// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isAuthenticated"],
};

const persistedUserReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedUserReducer,
  },
});

const persistor = persistStore(store);
export { store, persistor };
