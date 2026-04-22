import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useBarberos } from "../hooks/useBarberos";
import {
  createAppointment,
  getAppointments,
} from "../services/appointmentService";
import "../styles/BookingPage.css";
import BackHomeButton from "../components/BackHomeButton";

export default function BookingPage() {
  const { barberos } = useBarberos();

  const [form, setForm] = useState({
    date: "",
    time: "",
    barberId: "",
    serviceId: "",
  });

  const [message, setMessage] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const BASE_URL = "http://127.0.0.1:8000";

  // ================== LOAD ==================
  useEffect(() => {
    loadAppointments();
    loadServices();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setBookings(data);
    } catch (error) {
      console.error("Error cargando citas:", error);
    }
  };

  const loadServices = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/services/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    }
  };

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================== HORAS ==================
  const generateTimes = () => {
    const times: string[] = [];
    for (let h = 8; h <= 20; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return times;
  };

  const availableTimes =
    form.date && form.barberId
      ? generateTimes().filter((t) => {
          const selected = `${form.date}T${t}`;
          return !bookings.some(
            (b) =>
              b.barber === Number(form.barberId) &&
              b.start_datetime.startsWith(selected),
          );
        })
      : [];

  // ================== SUBMIT ==================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const start = `${form.date}T${form.time}:00`;
      const end = `${form.date}T${String(Number(form.time.split(":")[0]) + 1).padStart(2, "0")}:00`;

      const appointmentData = {
        barber: Number(form.barberId),
        service: Number(form.serviceId),
        start_datetime: start,
        end_datetime: end,
        client: Number(localStorage.getItem("user_id")),
      };

      await createAppointment(appointmentData);

      showMessage("✅ Cita creada");
      loadAppointments();

      setForm({
        date: "",
        time: "",
        barberId: "",
        serviceId: "",
      });
    } catch (error: any) {
      console.error("Error backend:", error?.response?.data);
      showMessage("❌ Error al agendar");
    }
  };

  return (
    <div className="booking-page">
      <BackHomeButton />

      <div className="booking-grid">
        {/* FORM */}
        <div className="booking-card">
          <h2>Agendar Cita</h2>
          <p className="muted">Reserva tu servicio</p>

          {message && <div className="alert success">{message}</div>}

          {/* BARBEROS */}
          <div className="barbers-grid">
            {barberos?.map((b: any) => (
              <div
                key={b.id}
                className={`barber-card ${
                  form.barberId === String(b.id) ? "selected" : ""
                }`}
                onClick={() => setForm({ ...form, barberId: String(b.id) })}
              >
                <img
                  src={
                    b.image_url?.startsWith("http")
                      ? b.image_url
                      : `${BASE_URL}${b.image_url}`
                  }
                  alt={b.first_name}
                  className="barber-photo"
                  onError={(e) =>
                    (e.currentTarget.src = "https://via.placeholder.com/80")
                  }
                />

                <h4>
                  {b.first_name} {b.last_name}
                </h4>
                <p>{b.role_display}</p>
              </div>
            ))}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="row">
              <label className="label half">
                Fecha
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </label>

              <label className="label half">
                Hora
                <select name="time" value={form.time} onChange={handleChange}>
                  <option value="">Selecciona</option>
                  {availableTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="label">
              Servicio
              <select
                name="serviceId"
                value={form.serviceId}
                onChange={handleChange}
              >
                <option value="">Selecciona un servicio</option>
                {services.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - ${s.price}
                  </option>
                ))}
              </select>
            </label>

            <div className="actions">
              <button className="btn primary" type="submit">
                Agendar
              </button>

              <button
                type="button"
                className="btn ghost"
                onClick={() =>
                  setForm({
                    date: "",
                    time: "",
                    barberId: "",
                    serviceId: "",
                  })
                }
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* LISTA */}
        <div className="booking-list">
          <h3>Citas</h3>

          <ul>
            {bookings.map((b: any) => (
              <li key={b.id} className="booking-item">
                <div className="booking-main">
                  <span className="booking-name">{b.client_name}</span>
                  <span className="booking-meta">{b.barber_name}</span>
                  <span className="booking-service">
                    {new Date(b.start_datetime).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
