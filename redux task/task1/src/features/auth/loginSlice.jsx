import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/Axiosinterceptor";
// import API_PATHS from "../../service/apiPath";
import {login} from "../../service/authService"



export const loginUser = createAsyncThunk("auth/loginUser", async (values, thunkAPI) => {
  try {
     const response = await login(values); 
   console.log(response);
// const response = await axiosInstance.post(API_PATHS.LOGIN, values);
    
    return response.data; 


  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
       console.log(action);
       
        state.loading = false;
        state.token = action.payload.token;

        
        state.user = {
          email: action.payload.email,
          name: action.payload.name,
        };
        
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
