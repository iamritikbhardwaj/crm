import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    form: [],
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user.push({
                id: uuidv4(),
                ...action.payload,
            });
        },
        removeUser: (state, action) => {
            state.user = state.user.filter((user) => user.id !== action.payload);
        },
    },
});

const { addUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;