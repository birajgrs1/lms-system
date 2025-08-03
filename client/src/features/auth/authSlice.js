import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Login
export const signIn = createAsyncThunk("auth/signIn", async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    }, { withCredentials: true });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// Register
export const signUp = createAsyncThunk("auth/signUp", async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      name: userData.username,
      email: userData.email,
      password: userData.password,
      role: "Student"
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/forgot-password', { email });
    return "Password reset instructions sent if email exists";
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Password reset failed");
  }
});

// Reset Password
export const resetPassword = createAsyncThunk("auth/resetPassword", async ({ token, newPassword }, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/reset-password', { token, newPassword });
    return "Password reset successful";
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Password reset failed");
  }
});

// Refresh Token
export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/auth/refresh-token', {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Session expired. Please login again");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
  } finally {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }
  return;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.message = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        state.message = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  }
});

export const { clearMessage, setCredentials } = authSlice.actions;
export default authSlice.reducer;
