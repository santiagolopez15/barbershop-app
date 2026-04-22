import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Barbería Cali</h1>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/register">Registrarse</Link>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/booking">Agendar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
