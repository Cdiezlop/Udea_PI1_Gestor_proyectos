package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Compromisos;
import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.ComentariosDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import co.edu.udea.gestor_de_proyectos.repository.CompromisosRepository;
import co.edu.udea.gestor_de_proyectos.repository.ProyectoRepository;
import co.edu.udea.gestor_de_proyectos.service.FechaActualService;
import co.edu.udea.gestor_de_proyectos.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import java.time.LocalDate;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de proyectos.
 * - Mapea CrearProyectoDTO -> Proyecto -> ProyectoModel
 * - Asigna fechaRegistro = LocalDate.now()
 * - Estado inicial: "Por revisar"
 */
@Service
@RequiredArgsConstructor
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;

    @Override
    public ProyectoModel crearProyecto(CrearProyectoDTO dto) {
        Proyecto proyecto = new Proyecto();
        proyecto.setId(UUID.randomUUID().toString());
        proyecto.setNombre(dto.getNombre());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setUserId(dto.getUserId());
        proyecto.setCategoria(dto.getCategoria());
        proyecto.setPresupuesto(dto.getPresupuesto());
        proyecto.setDirigidoa_a(dto.getDirigidoa_a());
        proyecto.setFechaCreacion(LocalDate.now());
        proyecto.setFechaModificacion(LocalDate.now());
        proyecto.setFechaFinalizacion(dto.getFechaFinalizacion());
        proyecto.setFechaCompromiso(dto.getFechaCompromiso());
        proyecto.setFechaPrimerAvance(dto.getFechaPrimerAvance());
        proyecto.setFechaRegistro(LocalDate.now());
        proyecto.setEstado("Por revisar");

        Proyecto saved = proyectoRepository.save(proyecto);
        return mapToModel(saved);
    }

    @Override
    public List<ProyectoModel> listarProyectos() {
        List<Proyecto> proyectos = proyectoRepository.findAll();
        return proyectos.stream().map(this::mapToModel).collect(Collectors.toList());
    }

    @Override
    public ProyectoModel proyectoPorId(String id) {
        Optional<Proyecto> opt = proyectoRepository.findById(id);
        Proyecto p = opt.orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        return mapToModel(p);
    }

    @Override
    public void cambiarEstado(String id, String nuevoEstado) {
        Optional<Proyecto> opt = proyectoRepository.findById(id);
        Proyecto p = opt.orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        p.setEstado(nuevoEstado);
        p.setFechaModificacion(LocalDate.now());
        proyectoRepository.save(p);
    }

    private ProyectoModel mapToModel(Proyecto proyecto) {
        ProyectoModel model = new ProyectoModel();
        model.setId(proyecto.getId());
        model.setNombre(proyecto.getNombre());
        model.setDescripcion(proyecto.getDescripcion());
        model.setPresupuesto(proyecto.getPresupuesto());
        model.setCategoria(proyecto.getCategoria());
        model.setUserId(proyecto.getUserId());
        model.setCompromisosId(proyecto.getCompromisosId());
        model.setFechaCreacion(proyecto.getFechaCreacion());
        model.setFechaModificacion(proyecto.getFechaModificacion());
        model.setFechaFinalizacion(proyecto.getFechaFinalizacion());
        model.setFechaCompromiso(proyecto.getFechaCompromiso());
        model.setFechaPrimerAvance(proyecto.getFechaPrimerAvance());
        model.setFechaRegistro(proyecto.getFechaRegistro());
        model.setEstado(proyecto.getEstado());
        return model;
    }
}