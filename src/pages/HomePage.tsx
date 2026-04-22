import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import americanoCorte from "../assets/images/americano-corte.jpg";
import cropCorte from "../assets/images/Crop-corte.jpg";
import dieselCorte from "../assets/images/diesel-corte.jpg";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1 className="title">MÁS QUE UN CORTE, UNA EXPERIENCIA</h1>
        <h2 className="subtitle">BARBER SHOP</h2>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="active">INICIO</Link>
          </li>
          <li>
            <Link to="/servicios">SERVICIOS</Link>
          </li>
          <li>
            <Link to="/agendar">AGENDAR CITA</Link>
          </li>
          <li> </li>
          
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Todas las categorías</h3>
          <ul>
            <li>Barba y afeitado</li>
            <li>Cortes clásicos</li>
            <li>Cortes modernos</li>
            <li>Tratamientos capilares</li>
            <li>Peinados especiales</li>
          </ul>
        </aside>

        {/* Services */}
        <section className="services">
          <div className="card">
            <img src= {dieselCorte} alt="Diesel" />
            <h4>Diesel</h4>
            <p>Cortes clásicos</p>
          </div>
          <div className="card">
            <img src={americanoCorte} alt="Americano" />
            <h4>Americano</h4>
            <p>Cortes clásicos</p>
          </div>
          <div className="card">
            <img src={cropCorte} alt="Crop top" />
            <h4>Crop top</h4>
            <p>Cortes modernos</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
