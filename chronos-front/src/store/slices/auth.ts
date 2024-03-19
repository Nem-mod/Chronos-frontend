import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios.ts';

export type Client = {
    username: string | null,
    email: string | null,
    password?: string
}

export const fetchRegister = createAsyncThunk(
    'auth/register',
    async (params: any, thunkAPI) => {
        try {
            const response = await axios.post('/auth/register', params);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);


export const fetchAuth = createAsyncThunk(
    'auth/login',
    async (params: any, thunkAPI) => {
        try {
            const response = await axios.post('/auth/login', params);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const fetchAuthMe = createAsyncThunk(
    'auth/me',
    async (params: any, thunkAPI) => {
        try {
            const response = await axios.get('/auth/profile', params);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const fetchVerify = createAsyncThunk(
    'auth/verify/',
    async (params: any) => {
        const { data } = await axios.post('/auth/verify/send-code', params);
        return data;
    },
);


interface AuthState {
    loading: boolean,
    userInfo: Client | null,
    error: any | null,
    success: boolean
}

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = {
                username: action.payload.username,
                email: action.payload.email,
            };
            state.success = true;
        });

        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = {
                username: action.payload.username,
                email: action.payload.email,
            };
            state.success = true;
        });

        builder.addCase(fetchAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = {
                username: action.payload.username,
                email: action.payload.email,
            };
            state.success = true;
        });

        builder.addCase(fetchAuthMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        });

    },
});

export const authReducer = authSlice.reducer;

