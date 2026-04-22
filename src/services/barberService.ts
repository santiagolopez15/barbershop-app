import api from "./apiClient";

export const getBarbers = async () => {
  try {
    const response = await api.get("/accounts/barbers/");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo barberos:", error);
    throw error;
  }
};