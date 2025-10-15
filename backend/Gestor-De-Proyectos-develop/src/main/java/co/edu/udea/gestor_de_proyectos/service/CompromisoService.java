package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.model.compromiso.CompromisoModel;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearCompromisoDTO;

import java.util.List;

public interface CompromisoService {
    CompromisoModel crearCompromiso(CrearCompromisoDTO dto);
    CompromisoModel actualizarCompromiso(String id, ActualizarCompromisoDTO dto);
    List<CompromisoModel> listarCompromisos();
    List<CompromisoModel> obtenerCompromisosPorProyecto(String proyectoId);
    CompromisoModel obtenerCompromisoPorId(String id);
    void eliminarCompromiso(String id);

}
