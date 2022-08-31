import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// GetUser From Localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Login User

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(login.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logOUt();
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
