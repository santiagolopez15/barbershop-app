// src/services/authService.ts
import apiClient from "./apiClient";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// 🔐 LOGIN
export const login = async (data: LoginData) => {
  try {
    const response = await apiClient.post("/accounts/login/", data);

    // ✅ guardar tokens
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
  } catch (error: any) {
    console.error("Error login:", error.response?.data || error.message);
    throw error;
  }
};
// 📝 REGISTER
export const register = async (data: RegisterData) => {
  try {
    const response = await apiClient.post("/accounts/register/", data);
    return response.data;
  } catch (error: any) {
    console.error("Error register:", error.response?.data || error.message);
    throw error;
  }
};

// 🚪 LOGOUT
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};