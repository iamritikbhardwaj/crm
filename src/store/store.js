import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/userSlice.js";

export const store = configureStore({
    reducer: UserSlice.reducer,
});