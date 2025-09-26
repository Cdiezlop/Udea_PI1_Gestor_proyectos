import React from "react";
import { useNavigate } from "react-router-dom";

function CerrarSesion() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar datos del usuario en localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // Redirigir al login
    navigate("/login");
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}

export default CerrarSesion;