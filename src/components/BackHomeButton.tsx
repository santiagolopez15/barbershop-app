import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../styles/BackHomeButton.css";

const BackHomeButton = () => {
  return (
    <Link to="/" className="sidebar-home-icon" title="Volver al inicio">
      <FaHome className="sidebar-home-icon-inner" />
    </Link>
  );
};

export default BackHomeButton;


