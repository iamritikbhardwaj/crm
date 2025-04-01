import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trip: null,
};

const tripSlice = createSlice({
    name: "trip",
    initialState,
    reducers: {
        setTrip(state, action) {
            state.trip = action.payload;
        },
    },
});

export const { setTrip } = tripSlice.actions;
export default tripSlice.reducer;