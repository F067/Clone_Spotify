import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    spotifyToken: null,
    playlistLibrary: [],
    track: [],
    likedSong: []
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
        setPlaylistLibrary(state, action) {
            state.playlistLibrary = action.payload
        },
        setTrack(state, action) {
            state.track = action.payload
        },
        setLikedSong(state, action) {
            state.likedSong = action.payload
        },
        setReset: () => initialState,
    },
});

export const { setUser, setToken, setReset, setSpotifyToken, setPlaylistLibrary, setTrack, setLikedSong } = userSlice.actions;
export default userSlice.reducer;
