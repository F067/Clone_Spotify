// spotifySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null
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
        setReset: () => initialState
    },
});

export const { setUser, setToken, setReset } = userSlice.actions;
export default userSlice.reducer;
