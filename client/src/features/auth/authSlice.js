import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk("auth/signIn", async (credentials, thunkAPI) => {
  await new Promise((r) => setTimeout(r, 1000));
  if (
    (credentials.email === "test@example.com" || credentials.username === "test") &&
    credentials.password === "password"
  ) {
    return { user: { name: "Test User" } };
  }
  return thunkAPI.rejectWithValue("Invalid credentials");
});

export const signUp = createAsyncThunk("auth/signUp", async (userData, thunkAPI) => {
  await new Promise((r) => setTimeout(r, 1000));
  if (!userData.email || !userData.username || !userData.password) {
    return thunkAPI.rejectWithValue("All fields are required");
  }
  return { user: { name: userData.username } };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = "Signed in successfully";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = "Account created successfully";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;