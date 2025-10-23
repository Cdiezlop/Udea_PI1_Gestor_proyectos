package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;

import java.util.List;

/**
 * Interfaz del servicio de proyectos
 * Define las operaciones disponibles sobre los proyectos.
 */
public interface ProyectoService {

    Proyecto crearProyecto(Proyecto proyecto);

    Proyecto obtenerProyectoPorId(String id);

    List<Proyecto> listarProyectos();

    Proyecto actualizarProyecto(String id, Proyecto proyecto);

    void eliminarProyecto(String id);

    Proyecto cambiarEstado(String id, CambioDeEstadoModel cambioDeEstado);

    List<Proyecto> listarProyectosPorUsuario(String userId);
}
