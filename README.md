# 💈 Barbershop App

Aplicación web para la gestión de citas en barberías. Permite a los usuarios agendar servicios seleccionando barberos disponibles, horarios y tipos de corte.

---

## 🚀 Tecnologías utilizadas

### Frontend

* React + TypeScript
* Axios
* CSS personalizado

---

## ✨ Funcionalidades

* 🔐 Login con autenticación JWT
* 👤 Registro de usuarios
* 💈 Visualización de barberos
* 🖼️ Carga de imágenes de barberos
* ✂️ Listado de servicios
* 📅 Agendamiento de citas
* ⏰ Validación de horarios disponibles
* 🚫 Restricción de citas según disponibilidad del barbero
* 📋 Listado de citas desde la API

---

## ⚙️ Instalación y ejecución

### 🔧 Backend (Django)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Servidor en:

```
http://127.0.0.1:8000
```

---

### 💻 Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Aplicación en:

```
http://localhost:5173
```

---

## 🔐 Autenticación

La aplicación utiliza JWT.

Al iniciar sesión:

* Se obtiene un token `access`
* Se guarda en `localStorage`
* Se envía en cada request:

```ts
Authorization: Bearer <token>
```

---

## 🔗 Endpoints principales

* `POST /api/accounts/login/` → Login
* `GET /api/accounts/barbers/` → Listar barberos
* `GET /api/services/` → Listar servicios
* `GET /api/appointments/` → Listar citas
* `POST /api/appointments/` → Crear cita

---

## 📁 Estructura del proyecto

```
barbershop-app/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── apps/
│   ├── models/
│   ├── views/
│   └── serializers/
│
└── README.md
```

---

## 🧠 Notas importantes

* Los barberos deben tener días de trabajo configurados en el admin de Django
* Los servicios deben existir en base de datos antes de agendar
* El token JWT es obligatorio para consumir los endpoints protegidos

---

## 👨‍💻 Autores

**Santiago López**

**Jhonatan Barrera**


