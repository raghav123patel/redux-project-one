import axiosInstance from "../helper/Axiosinterceptor";
import API_PATHS from "../service/apiPath";

export const register = async (registrationData) => {
  try {
    const response = await axiosInstance.post(API_PATHS.REGISTER, registrationData);
    console.log(response)
    return response.data; 
  } catch (error) {
    throw new Error("Registration failed: " + (error.response?.data?.message || error.message));
  }
};

export const verifyEmail = async (evtoken, id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.VERIFY_EMAIL}?token=${evtoken}&userId=${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Verification failed: " + (error.response?.data?.message || error.message));
  }
};

export const forgot= async (email) => {
  try {
    const response = await axiosInstance.post(API_PATHS.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error) {
    throw new Error("Error in forgot password: " + (error.response?.data?.message || error.message));
  }
};

export const reset = async (password,token,userId) => {

  try {
    const response = await axiosInstance.post(API_PATHS.RESET_PASSWORD, {
      password:password,
      token:token,
      userId:userId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error during password reset: " + (error.response?.data?.message || error.message));
  }
};

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(API_PATHS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed: " + (error.response?.data?.message || error.message));
  }
};
