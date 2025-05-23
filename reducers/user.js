import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { token: null, firstname: null, lastname: null, email: null, role: null, photo: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state) => {
            state.value = { token: null, firstname: null, lastname: null, email: null, role: null, photo: null }
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
