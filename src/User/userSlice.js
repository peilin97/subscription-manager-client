import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        subscriptions: '',
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
    }
});

export const {
    setUsername,
    setEmail,
    setSubscriptions,
} = userSlice.actions;

export const selectUsername = state => state.user.username;
export const selectEmail = state => state.user.email;
export const selectSubscriptions = state => state.user.subscriptions;

export default userSlice.reducer;