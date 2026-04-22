import apiClient from "./apiClient";

// 🔹 Tipo de datos de una cita (según tu backend)
export interface Appointment {
  id?: number;
  client: number;
  barber: number;
  service: number;
  start_datetime: string;
  end_datetime: string;
  notes?: string;
}

// ======================================================
// 🔥 CREAR CITA
// ======================================================
export const createAppointment = async (data: Appointment) => {
  try {
    const response = await apiClient.post("/appointments/", data);
    return response.data;
  } catch (error: any) {
    console.error("Error creando cita:", error?.response?.data || error);
    throw error;
  }
};

// ======================================================
// 🔥 OBTENER TODAS LAS CITAS
// ======================================================
export const getAppointments = async () => {
  try {
    const response = await apiClient.get("/appointments/");
    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo citas:", error?.response?.data || error);
    throw error;
  }
};

// ======================================================
// 🔥 ELIMINAR CITA
// ======================================================
export const deleteAppointment = async (id: number) => {
  try {
    const response = await apiClient.delete(`/appointments/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error("Error eliminando cita:", error?.response?.data || error);
    throw error;
  }
};

// ======================================================
// 🔥 ACTUALIZAR CITA (opcional pero recomendado)
// ======================================================
export const updateAppointment = async (id: number, data: Appointment) => {
  try {
    const response = await apiClient.put(`/appointments/${id}/`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error actualizando cita:", error?.response?.data || error);
    throw error;
  }
};