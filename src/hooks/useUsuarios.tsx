import { useState, useEffect } from "react";

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
}

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Cargar usuarios al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("usuarios");
    setUsuarios(stored ? JSON.parse(stored) : []);
  }, []);

  // Guardar en localStorage cuando se actualizan
  const saveToStorage = (data: Usuario[]) => {
    localStorage.setItem("usuarios", JSON.stringify(data));
  };

  // Registrar usuario nuevo
  const addUsuario = (usuario: Omit<Usuario, "id">) => {
    const newUser: Usuario = {
      id: Date.now(),
      ...usuario,
    };

    const updated = [...usuarios, newUser];

    setUsuarios(updated);
    saveToStorage(updated);
  };

  // Eliminar usuario
  const deleteUsuario = (id: number) => {
    const updated = usuarios.filter((u) => u.id !== id);

    setUsuarios(updated);
    saveToStorage(updated);
  };

  return { usuarios, addUsuario, deleteUsuario };
};

export default useUsuarios;
