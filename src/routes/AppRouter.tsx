import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ServicesPage from "../pages/ServicesPage";
import AuthMenu from "../components/authMenu"; 
import AdminDashboard from "../pages/AdminDashboard";


const AppRouter = () => {
  const location = useLocation();

  // Ocultamos el AuthMenu en login, registro y perfil.
  const hideAuthMenu =
    location.pathname === "/login" || location.pathname === "/registro" || location.pathname === "/perfil";

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agendar" element={<BookingPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      {!hideAuthMenu && <AuthMenu />}
    </div>
  );
};

export default AppRouter;



