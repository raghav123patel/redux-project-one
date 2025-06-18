
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyEmail } from "../../service/authService";


export const verifyEmailThunk = createAsyncThunk(
  "emailVerification/verify",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await verifyEmail(token, id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: "",
  },
  reducers: {
    resetVerificationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmailThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetVerificationState } = emailVerificationSlice.actions;
export default emailVerificationSlice.reducer;
