import axios from "axios";

const API_URL = "/api/user/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post("/api/user/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logOUt = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logOUt,
  login,
};

export default authService;
