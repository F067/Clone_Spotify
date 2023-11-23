import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    spotifyToken: null,
    track: [],
    played: null,
    volume: 70
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
        setTrack(state, action) {
            state.track = action.payload
        },
        setPlayed(state, action) {
            state.played = action.payload
        },
        setVolume(state, action) {
            state.volume = action.payload
        },
        setReset: () => initialState,
    },
});

export const { setUser, setToken, setReset, setSpotifyToken, setTrack, setLikedSong, setPlayed, setVolume } = userSlice.actions;
export default userSlice.reducer;
