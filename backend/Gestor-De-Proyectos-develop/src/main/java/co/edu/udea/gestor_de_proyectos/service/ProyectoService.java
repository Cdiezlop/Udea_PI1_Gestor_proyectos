package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Interfaz del servicio de proyectos
 * Define las operaciones disponibles sobre los proyectos.
 */
public interface ProyectoService {

    ProyectoModel crearProyecto (CrearProyectoDTO crearProyectoDTO);

    Page<ProyectoModel> proyectosPaginados (int page, int size);

    ProyectoModel actualizarProyecto (String id, ActualizarProyectoDTO actualizarProyectoDTO);

    List<ProyectoModel> listarProyectos ();

    ProyectoModel cambiarEstado(String id, CambioDeEstadoModel cambioDeEstadoModel);

    ProyectoModel proyectoPorId(String proyectoId);

    List<ProyectoModel> listarProyectosPorUsuario(String userId);
}
