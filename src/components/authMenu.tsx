import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import "../styles/AuthMenu.css";

const AuthMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="auth-menu-container">
      <button
        className={`auth-menu-button ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <User size={22} />
      </button>

      {open && (
        <div className="auth-menu-options">
          <Link to="/login" className="auth-option">Iniciar sesión</Link>
          <Link to="/registro" className="auth-option">Registro</Link>
          <Link to="/perfil" className="auth-option">Perfil</Link>
        </div>
      )}
    </div>
  );
};

export default AuthMenu;
