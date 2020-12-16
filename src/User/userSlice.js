import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        subscriptions: '',
        cover: '',
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
        }
    }
});

export const {
    setUsername,
    setEmail,
    setSubscriptions,
    setCover,
} = userSlice.actions;

export const selectUsername = state => state.user.username;
export const selectEmail = state => state.user.email;
export const selectSubscriptions = state => state.user.subscriptions;
export const selectCover = state => state.user.cover;


export default userSlice.reducer;