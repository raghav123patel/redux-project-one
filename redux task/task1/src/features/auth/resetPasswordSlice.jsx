import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/Axiosinterceptor";
import { reset } from "../../service/authService";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token, userId }, thunkAPI) => {
    try {
      const response = await reset(password,token,userId)
      console.log(response)
      return response.
      message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearResetMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResetMessages } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
