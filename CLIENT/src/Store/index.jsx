import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './Token/slice';

export const store = configureStore({
    reducer: {
      spotify: spotifyReducer,
    },
  });