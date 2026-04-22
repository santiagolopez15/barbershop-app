import "../styles/ServicesPage.css";
import barba from "../assets/images/barba.jpg";
import corteClasico from "../assets/images/clasico.jpg";
import moderno from "../assets/images/moderno.webp";
import tradicional from "../assets/images/tradicional.jpg";
import BackHomeButton from "../components/BackHomeButton";

const ServicesPage = () => {
  const services = [
    {
      title: "Corte Clásico",
      description:
        "Un corte limpio y tradicional para mantener tu estilo impecable.",
      price: "$25.000",
      image: corteClasico,
    },
    {
      title: "Corte Moderno",
      description: "Tendencias actuales con un acabado profesional.",
      price: "$30.000",
      image: moderno,
    },
    {
      title: "Afeitado Tradicional",
      description:
        "Afeitado con toalla caliente y navaja para una experiencia única.",
      price: "$20.000",
      image: tradicional,
    },
    {
      title: "Diseño de Barba",
      description: "Moldea y define tu barba para un look pulido y moderno.",
      price: "$22.000",
      image: barba,
    },
  ];

  return (
    <div className="services-page">
      {/* Botón flotante de regreso */}
      <BackHomeButton />

      <header className="services-header">
        <h1>Nuestros Servicios</h1>
        <p>Estilo, precisión y experiencia en cada detalle.</p>
      </header>

      <section className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p className="description">{service.description}</p>
            <p className="price">{service.price}</p>
            <button className="book-btn">Agendar Cita</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServicesPage;
