import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCategoriasService,
  crearProyectoService,
} from "../services/crear-proyectosService"; // Importamos los servicios
import "../styles/CrearProyecto.css"; // Importamos los estilos

function CrearProyecto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [userId, setUserId] = useState(""); // Captura el userId
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserId = localStorage.getItem("userId");
    if (loggedUserId) {
      setUserId(loggedUserId);
    }

    const loadCategorias = async () => {
      try {
        const data = await fetchCategoriasService();
        setCategorias(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proyecto = { nombre, descripcion, categoria, userId };

    try {
      const success = await crearProyectoService(proyecto);
      if (success) {
        alert("Proyecto creado con éxito");
        navigate("/proyectos");
      } else {
        alert("Error al crear el proyecto");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Información del nuevo proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="nombre">Título del proyecto</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe el título del proyecto"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="categoria">Categoría</label>
          <select
            className="form-control custom-control"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="userId">ID del usuario</label>
          <input
            type="text"
            className="form-control custom-control"
            id="userId"
            value={userId}
            disabled
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            placeholder="Describe el proyecto"
            required
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary crear-btn">
            Crear
          </button>
        </div>
        <div className="text-center mt-4">
        <button
          className="btn btn-primary volver-lista"
          onClick={() => navigate("/proyectos")}
        >
          Volver a la lista
        </button>
      </div>
      </form>
    </div>
  );
}

export default CrearProyecto;