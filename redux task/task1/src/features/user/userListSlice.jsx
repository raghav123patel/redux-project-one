import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser } from "../../service/userService";

export const getUserList = createAsyncThunk(
  "userList/getUserList",
  async ({ pageNumber, pageSize }, thunkAPI) => {
    try {
      const { users, totalUsers } = await fetchUsers(pageNumber, pageSize);
      return { users, totalUsers };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);

export const removeUser = createAsyncThunk(
  "userList/removeUser",
  async ({ id, pageNumber, pageSize }, thunkAPI) => {
    try {
      await deleteUser(id);
      thunkAPI.dispatch(getUserList({ pageNumber, pageSize }));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Delete failed");
    }
  }
);

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userListSlice.reducer;
