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
    resetTrip(state) {
      state.trip = null;
    },
  },
});

export const { setTrip, resetTrip } = tripSlice.actions;
export default tripSlice.reducer;
