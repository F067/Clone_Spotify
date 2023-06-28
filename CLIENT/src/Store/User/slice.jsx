// spotifySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signedupUser: null,
    signedinUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSignedupUser(state, action) {
            state.signedupUser = action.payload;
        },
        setSignedinUser(state, action) {
            state.signedinUser = action.payload;
        }
    },
});

export const { setSignedupUser, setSignedinUser } = userSlice.actions;
export default userSlice.reducer;
