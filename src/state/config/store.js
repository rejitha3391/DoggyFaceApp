import {configureStore} from '@reduxjs/toolkit';
import {dogSlice} from '../dogSlice';

//configuration file for redux store
export const store = configureStore({
  reducer: dogSlice.reducer,
});
