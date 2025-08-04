import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, logout } from '../../services/auth';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await login(credentials);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Login failed' });
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await register(userData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Registration failed' });
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logout();
    localStorage.removeItem('token');
    return null;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});

const unpackAuthPayload = (payload) => {
  // Handle different response shapes
  const token = payload?.token || payload?.data?.token || null;
  const user = payload?.user || payload?.data?.user || null;
  const message = payload?.message || payload?.data?.message || null;
  return { token, user, message };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    message: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user, message } = unpackAuthPayload(action.payload);
        state.user = user;
        state.token = token;
        state.message = message || 'Login successful!';
        if (token) localStorage.setItem('token', token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errors || null;
        state.message = action.payload.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user, message } = unpackAuthPayload(action.payload);
        state.user = user;
        state.token = token;
        state.message = message || 'Registration successful!';
        if (token) localStorage.setItem('token', token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errors || null;
        state.message = action.payload.message || 'Registration failed';
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.message = 'Logged out successfully';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;