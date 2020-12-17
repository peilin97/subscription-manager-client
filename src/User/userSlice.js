import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        subscriptions: '',
        cover: '',
        loggedIn: false,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setSubscriptions: (state, action) => {
            state.subscriptions = action.payload;
        },
        setCover: (state, action) => {
            state.cover = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
    }
});

export const {
    setUsername,
    setEmail,
    setSubscriptions,
    setCover,
    setLoggedIn,
} = userSlice.actions;

export const selectUsername = state => state.user.username;
export const selectEmail = state => state.user.email;
export const selectSubscriptions = state => state.user.subscriptions;
export const selectCover = state => state.user.cover;
export const selectLoggedIn = state => state.user.loggedIn;


export default userSlice.reducer;