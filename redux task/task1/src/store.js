import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/loginSlice";
import registerReducer from "./features/auth/registerSlice";
import emailVerificationReducer from "./features/auth/emailVerificationSlice"; 
import forgotPasswordReducer from "./features/auth/forgotPasswordSlice";
import resetPasswordReducer from "./features/auth/resetPasswordSlice";
import editUserDetailReducer from "./features/user/editUserDetailSlice";
import userListReducer from "./features/user/userListSlice";
import userDetailReducer from "./features/user/userDetailSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
     register: registerReducer,
      emailVerification: emailVerificationReducer,
       forgotPassword: forgotPasswordReducer,
       resetPassword: resetPasswordReducer,
        editUserDetail: editUserDetailReducer,
        userList: userListReducer,
        userDetail: userDetailReducer,
  },
});

export default store;
