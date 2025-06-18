import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserDetails } from "../../service/userService";

export const getUserDetail = createAsyncThunk(
  "userDetail/getUserDetail",
  async (id, thunkAPI) => {
    try {
      const data = await fetchUserDetails(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user detail");
    }
  }
);

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserDetail: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserDetail } = userDetailSlice.actions;
export default userDetailSlice.reducer;
