
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, fetchMe, logout as logoutApi, refreshToken } from '../../services/auth';

// Thunks
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await login(credentials);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
try {
    const { data } = await register(userData);
    return data;
} catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
}
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await fetchMe();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await logoutApi();
    return true;
});

export const refreshAuthToken = createAsyncThunk('auth/refreshToken', async () => {
  const { data } = await refreshToken();
  return data;
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    // REGISTER
    builder.addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(registerUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.token = action.payload.token;
    localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    // FETCH ME
    builder.addCase(getMe.fulfilled, (state, action) => { state.user = action.payload; });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
    state.user = null;
    state.token = null;
    localStorage.removeItem('token');
    });

    // REFRESH TOKEN
    builder.addCase(refreshAuthToken.fulfilled, (state, action) => {
    state.token = action.payload.token;
    localStorage.setItem('token', action.payload.token);
    });
},
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;


