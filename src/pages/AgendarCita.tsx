import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BookingPage.css";

interface Cita {
  id: number;
  cliente: string;
  fecha: string;
  hora: string;
  servicio: string;
  barbero: string;
  estado: string;
}

export default function AgendarCita() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [barbero, setBarbero] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaCita: Cita = {
      id: Date.now(),
      cliente: nombre,
      fecha,
      hora,
      servicio,
      barbero,
      estado: "Pendiente",
    };

    const citasGuardadas = JSON.parse(localStorage.getItem("citas") || "[]");
    citasGuardadas.push(nuevaCita);
    localStorage.setItem("citas", JSON.stringify(citasGuardadas));

    alert("✅ Cita agendada correctamente");
    setNombre("");
    setFecha("");
    setHora("");
    setServicio("");
    setBarbero("");
  };

  return (
    <div className="agendar-container">
      <button className="backHomeButton" onClick={() => navigate("/")}>
        🏠 Volver a Home
      </button>

      <h1 className="title">Agendar Cita 💈</h1>

      <form onSubmit={handleSubmit} className="agendar-form">
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Servicio (ej: Corte Clásico)"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Barbero (ej: Erling Haaland)"
          value={barbero}
          onChange={(e) => setBarbero(e.target.value)}
          required
        />

        <button type="submit" className="backHomeButton">
          ✂️ Agendar Cita
        </button>
      </form>
    </div>
  );
}
