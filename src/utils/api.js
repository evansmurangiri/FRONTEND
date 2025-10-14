import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // backend URL
  withCredentials: true, // send cookies (JWT token)
});

// ========== ADMIN ROUTES ==========
export const fetchAllUsers = () => API.get("/admin/users");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

// ========== USER ROUTES ==========
export const registerUser = (formData) => API.post("/user/register", formData);
export const loginUser = (formData) => API.post("/user/login", formData);
export const logoutUser = () => API.get("/user/logout");
export const getProfile = () => API.get("/user/profile");
