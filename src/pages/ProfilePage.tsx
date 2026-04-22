import "../styles/ProfilePage.css";
import BackHomeButton from "../components/BackHomeButton";

const ProfilePage = () => {
  return (
    <div className="profile-wrapper">
       {/* Botón flotante de regreso */}
      <BackHomeButton />

      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <p>Cuida tu estilo, mejora tu experiencia.</p>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          <img
            src="https://i.imgur.com/YX2VcmR.png"
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <button className="change-photo-btn">Cambiar foto</button>
        </div>

        <div className="profile-right">
          <div className="profile-field">
            <label>Nombre completo</label>
            <input type="text" value="Santiago López" readOnly />
          </div>

          <div className="profile-field">
            <label>Correo electrónico</label>
            <input type="email" value="santiago@email.com" readOnly />
          </div>

          <div className="profile-field">
            <label>Teléfono</label>
            <input type="text" value="+57 300 123 4567" readOnly />
          </div>

          <div className="profile-field">
            <label>Contraseña</label>
            <input type="password" value="********" readOnly />
          </div>

          <button className="edit-profile-btn">Editar perfil</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
