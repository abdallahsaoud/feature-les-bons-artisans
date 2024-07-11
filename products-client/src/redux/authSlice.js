import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk('auth/signup', async ({ email, password }) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user/signup', { email, password });
        return response.data;
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
        return response.data;
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
});

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
