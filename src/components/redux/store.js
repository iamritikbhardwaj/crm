import { configureStore } from '@reduxjs/toolkit';
import vendorSlice from './slices/vendorSlice';

const store = configureStore({
  reducer: {
    vendorSlice: createVendor,  // Add your slice reducer here
  },
});

export default store;