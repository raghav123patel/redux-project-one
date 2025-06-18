import axiosInstance from "../helper/Axiosinterceptor";
import API_PATHS from "../service/apiPath";


export const fetchUsers = async (pageNumber = 1, pageSize = 10 ) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.USER_LIST}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log(response)
    return {
      users: response.data.data,
      totalUsers: response.data.totalRecords,
    };
  } catch (error) {
    throw new Error("Error fetching users: " + (error.response?.data?.message || error.message));
  }
};


export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`${API_PATHS.DELETE_USER}/${id}`);
    return true;
  } catch (error) {
    throw new Error("Error deleting user: " + (error.response?.data?.message || error.message));
  }
};


export const fetchUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_PATHS.USER_LIST}/${id}`);
    return response.data.user;
  } catch (error) {
    throw new Error("Error fetching user details: " + (error.response?.data?.message || error.message));
  }
};


export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`${API_PATHS.USER_LIST}/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating user details: " + (error.response?.data?.message || error.message));
  }
};
