// src/features/user/editUserDetailSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserDetails, updateUser } from "../../service/userService";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, thunkAPI) => {
    try {
      const response = await fetchUserDetails(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user data");
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async ({ id, values }, thunkAPI) => {
    try {
      await updateUser(id, values);
      return "User updated successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue("User update failed");
    }
  }
);

const editUserDetailSlice = createSlice({
  name: "editUserDetail",
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = editUserDetailSlice.actions;
export default editUserDetailSlice.reducer;
