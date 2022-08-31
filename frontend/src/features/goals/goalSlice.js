import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gaolService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Goal

export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await gaolService.createGoal(goalData, token);
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Get User Goals

export const getGoals = createAsyncThunk(
  "goals/getall",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      const data = await gaolService.getGoals(token);
      return data;
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Create goal slice
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })

      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (goalData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await gaolService.deleteGoals(goalData, token);
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
