import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './Token/slice';
import userReducer from './User/slice';
import trackReducer from './Track/slice'


export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
    user: userReducer,
    track : trackReducer
  },
});