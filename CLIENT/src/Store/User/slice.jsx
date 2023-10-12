// spotifySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    spotifyToken: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setSpotifyToken(state, action) {
            state.spotifyToken = action.payload
        },
        setReset: () => initialState
    },
});

export const { setUser, setToken, setReset, setSpotifyToken } = userSlice.actions;
export default userSlice.reducer;
