import { useEffect, useState } from "react";
import { getBarbers } from "../services/barberService";
import "../styles/BookingPage.css";

export const useBarberos = () => {
  const [barberos, setBarberos] = useState<any[]>([]);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      const data = await getBarbers();
      setBarberos(data);
    } catch (error) {
      console.error("Error cargando barberos", error);
    }
  };

  return { barberos };
};