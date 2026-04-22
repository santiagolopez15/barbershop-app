import { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

// ✅ IMPORT CORRECTO (IMPORT NOMBRADO)
import { useBarberos } from "../hooks/useBarberos";
import useUsuarios from "../hooks/useUsuarios";

import BackHomeButton from "../components/BackHomeButton";

const AdminDashboard = () => {
  const { barberos = [], addBarber, deleteBarber } = useBarberos();
  const { usuarios = [], deleteUsuario } = useUsuarios();

  const [activeMenu, setActiveMenu] = useState("usuarios");

  // 🔥 Cargar citas (temporal, luego API)
  const [citas, setCitas] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("citas");
    setCitas(stored ? JSON.parse(stored) : []);
  }, []);

  // 🔥 Modal nuevo barbero
  const [showModal, setShowModal] = useState(false);
  const [newBarbero, setNewBarbero] = useState({
    nombre: "",
    rating: "",
    experiencia: "",
    imagen: "",
  });

  const handleAddBarbero = () => {
    if (!newBarbero.nombre || !newBarbero.imagen) {
      alert("Completa todos los campos");
      return;
    }

    addBarber({
      nombre: newBarbero.nombre,
      rating: parseFloat(newBarbero.rating) || 0,
      experiencia: newBarbero.experiencia,
      imagen: newBarbero.imagen,
    });

    setShowModal(false);
    setNewBarbero({ nombre: "", rating: "", experiencia: "", imagen: "" });
  };

  return (
    <div className="admin-dashboard">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div>
          <h2 className="sidebar-header">Barbería XYZ</h2>

          <ul className="sidebar-menu">
            <li
              className={activeMenu === "usuarios" ? "active" : ""}
              onClick={() => setActiveMenu("usuarios")}
            >
              Usuarios
            </li>

            <li
              className={activeMenu === "reservas" ? "active" : ""}
              onClick={() => setActiveMenu("reservas")}
            >
              Reservas
            </li>

            <li
              className={activeMenu === "barberos" ? "active" : ""}
              onClick={() => setActiveMenu("barberos")}
            >
              Barberos
            </li>
          </ul>
        </div>

        <div className="sidebar-buttons">
          <BackHomeButton />
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Panel de Administración</h1>
            <p className="header-date">{new Date().toLocaleDateString()}</p>
          </div>

          <div className="header-right">
            <span className="admin-avatar">👤</span>
            <span className="admin-name">Administrador</span>
          </div>
        </header>

        {/* ================= USUARIOS ================= */}
        {activeMenu === "usuarios" && (
          <section className="panel">
            <div className="panel-header">
              <h2>Usuarios Registrados</h2>
            </div>

            {usuarios.length === 0 ? (
              <p>No hay usuarios registrados aún.</p>
            ) : (
              <table className="usuarios-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((u: any) => (
                    <tr key={u.id}>
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>{u.telefono || "—"}</td>
                      <td>
                        <button
                          className="delete-user-btn"
                          onClick={() => {
                            if (confirm("¿Eliminar este usuario?"))
                              deleteUsuario(u.id);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* ================= RESERVAS ================= */}
        {activeMenu === "reservas" && (
          <section className="panel">
            <div className="panel-header">
              <h2>Citas Agendadas</h2>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Barbero</th>
                  </tr>
                </thead>

                <tbody>
                  {citas.length === 0 ? (
                    <tr>
                      <td colSpan={7}>Aún no hay citas registradas</td>
                    </tr>
                  ) : (
                    citas.map((c: any, i: number) => {
                      const barb = barberos.find(
                        (b: any) => b.id === Number(c.barberId)
                      );

                      return (
                        <tr key={i}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>{c.service}</td>
                          <td>{c.date}</td>
                          <td>{c.time}</td>
                          <td>{barb?.nombre || "Desconocido"}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ================= BARBEROS ================= */}
        {activeMenu === "barberos" && (
          <section className="panel">
            <div className="panel-header">
              <h2>Barberos</h2>
              <button
                className="add-barbero-btn"
                onClick={() => setShowModal(true)}
              >
                + Añadir Barbero
              </button>
            </div>

            <div className="barberos-grid">
              {barberos?.map((b: any) => (
                <div key={b.id} className="barbero-card">
                  <img src={b.imagen} alt={b.nombre} />
                  <h3>{b.nombre}</h3>
                  <p className="rating">⭐ {b.rating}</p>

                  <button
                    className="delete-barbero-btn"
                    onClick={() => {
                      if (confirm("¿Eliminar este barbero?"))
                        deleteBarber(b.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Añadir Barbero</h2>

            <input
              type="text"
              placeholder="Nombre"
              value={newBarbero.nombre}
              onChange={(e) =>
                setNewBarbero({ ...newBarbero, nombre: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Rating (0–5)"
              value={newBarbero.rating}
              onChange={(e) =>
                setNewBarbero({ ...newBarbero, rating: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Especialidad"
              value={newBarbero.experiencia}
              onChange={(e) =>
                setNewBarbero({ ...newBarbero, experiencia: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="URL de la Foto"
              value={newBarbero.imagen}
              onChange={(e) =>
                setNewBarbero({ ...newBarbero, imagen: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="confirm" onClick={handleAddBarbero}>
                Guardar
              </button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;