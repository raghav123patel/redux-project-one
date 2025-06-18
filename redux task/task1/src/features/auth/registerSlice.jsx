import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../service/authService";


export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (registrationData, thunkAPI) => {
    console.log(registrationData) 
    try {
      const response = await register(registrationData)
      console.log(response)
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);               

const registerSlice = createSlice({
  name: "register",
  initialState:{
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        
        
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        
        
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
