// spotifySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  expiresAt: null,
  tokenType: null
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
    setTokenType(state, action) {
      state.tokenType = action.payload;
    }
  },
});

export const { setAccessToken, setExpiresAt, setTokenType } = spotifySlice.actions;
export default spotifySlice.reducer;
