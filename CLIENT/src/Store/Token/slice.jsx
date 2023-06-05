// spotifySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  expiresAt: null,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setExpiresAt(state, action) {
      state.expiresAt = action.payload;
    },
  },
});

export const { setAccessToken, setExpiresAt } = spotifySlice.actions;
export default spotifySlice.reducer;
