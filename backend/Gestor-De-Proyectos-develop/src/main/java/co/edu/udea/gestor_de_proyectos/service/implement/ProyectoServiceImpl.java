package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Compromisos;
import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import co.edu.udea.gestor_de_proyectos.entity.Responsable;
import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.ComentariosDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearCompromisoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearResponsableDTO;
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
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final CompromisosRepository compromisosRepository;
    private final FechaActualService fechaActual;

    @Override
    public ProyectoModel crearProyecto(CrearProyectoDTO crearProyectoDTO) {
        Proyecto proyecto = new Proyecto();
        proyecto.setId(generateId(null));
        proyecto.setNombre(crearProyectoDTO.getNombre());
        proyecto.setDescripcion(crearProyectoDTO.getDescripcion());
        proyecto.setUserId(crearProyectoDTO.getUserId());
        proyecto.setCategoria(crearProyectoDTO.getCategoria());
        proyecto.setPresupuesto(crearProyectoDTO.getPresupuesto());
        proyecto.setDirigidoa_a(crearProyectoDTO.getDirigidoa_a());
        proyecto.setObservacionesIniciales(crearProyectoDTO.getObservacionesIniciales());
        
        proyecto.setFechaCreacion(fechaActual.getCurrentDate().toLocalDate());
        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());
        proyecto.setFechaInicio(crearProyectoDTO.getFechaInicio());
        proyecto.setFechaCompromiso(crearProyectoDTO.getFechaCompromiso());
        proyecto.setFechaPrimerAvance(crearProyectoDTO.getFechaPrimerAvance());
        proyecto.setFechaFinalizacion(crearProyectoDTO.getFechaCompromiso());

        long duracionMeses = 0;
        if (crearProyectoDTO.getFechaInicio() != null && crearProyectoDTO.getFechaCompromiso() != null) {
            if (!crearProyectoDTO.getFechaInicio().isAfter(crearProyectoDTO.getFechaCompromiso())) {
                Period period = Period.between(crearProyectoDTO.getFechaInicio(), crearProyectoDTO.getFechaCompromiso());
                duracionMeses = period.getYears() * 12 + period.getMonths();
                if (period.getDays() > 0) duracionMeses++;
                if (duracionMeses == 0) duracionMeses = 1;
            }
        }
        proyecto.setDuracion((int) duracionMeses);
        proyecto.setEstado("Por revisar");

        List<String> compromisosIds = new ArrayList<>();
        if (crearProyectoDTO.getCompromisos() != null) {
            for (CrearCompromisoDTO dto : crearProyectoDTO.getCompromisos()) {
                Compromisos c = new Compromisos();
                c.setId(generateId(null));
                c.setDescripcion(dto.getDescripcion());
                c.setEstado(dto.getEstado());
                c.setFechaEstimada(dto.getFechaEstimada());
                c.setFechaReal(fechaActual.getCurrentDate());
                compromisosIds.add(compromisosRepository.save(c).getId());
            }
        }
        proyecto.setCompromisosId(compromisosIds);

        List<Responsable> responsables = new ArrayList<>();
        if (crearProyectoDTO.getResponsables() != null) {
            for (CrearResponsableDTO dto : crearProyectoDTO.getResponsables()) {
                Responsable r = new Responsable();
                r.setNombre(dto.getNombre());
                r.setEdad(dto.getEdad());
                r.setRol(dto.getRol());
                r.setTelefono(dto.getTelefono());
                r.setCorreo(dto.getCorreo());
                responsables.add(r);
            }
        }
        proyecto.setResponsables(responsables);

        Proyecto savedProyecto = proyectoRepository.save(proyecto);
        return mapToModel(savedProyecto);
    }

    @Override
    public List<ProyectoModel> listarProyectosPorUsuario(String userId) {
        return proyectoRepository.findAllByUserId(userId).stream().map(this::mapToModel).toList();
    }

    @Override
    public ProyectoModel proyectoPorId(String proyectoId) {
        return proyectoRepository.findById(proyectoId)
                .map(this::mapToModel)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
    }

    @Override
    public Page<ProyectoModel> proyectosPaginados(int page, int size) {
        return proyectoRepository.findAll(PageRequest.of(page, size)).map(this::mapToModel);
    }

    @Override
    public ProyectoModel actualizarProyecto(String id, ActualizarProyectoDTO dto) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        proyecto.setNombre(dto.getNombre());
        proyecto.setCategoria(dto.getCategoria());
        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());
        proyecto.setEstado(dto.getEstado());
        return mapToModel(proyectoRepository.save(proyecto));
    }

    @Override
    public List<ProyectoModel> listarProyectos() {
        return proyectoRepository.findAll().stream().map(this::mapToModel).toList();
    }

    @Override
    public ProyectoModel cambiarEstado(String id, CambioDeEstadoModel model) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        
        ComentariosDTO cDto = model.getComentarios();
        
        // Validación obligatoria de observación para el administrador
        if (cDto == null || cDto.getComentario() == null || cDto.getComentario().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Es obligatorio agregar una observación para cambiar el estado.");
        }

        proyecto.setEstado(model.getEstado());
        
        ComentariosModel cm = new ComentariosModel();
        cm.setUser(cDto.getUser());
        cm.setFechaComentarios(fechaActual.getCurrentDate());
        cm.setComentario(cDto.getComentario());
        
        if ("Aceptado".equalsIgnoreCase(model.getEstado())) cm.setTipoComentario("Proyecto aceptado");
        else if ("Rechazado".equalsIgnoreCase(model.getEstado())) cm.setTipoComentario("Proyecto rechazado");
        else cm.setTipoComentario("Actualización de estado");
        
        proyecto.setComentarios(cm);
        
        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());
        return mapToModel(proyectoRepository.save(proyecto));
    }

    private ProyectoModel mapToModel(Proyecto proyecto) {
        ProyectoModel model = new ProyectoModel();
        model.setId(proyecto.getId());
        model.setNombre(proyecto.getNombre());
        model.setDescripcion(proyecto.getDescripcion());
        model.setUserId(proyecto.getUserId());
        model.setCategoria(proyecto.getCategoria());
        model.setPresupuesto(proyecto.getPresupuesto());
        model.setDirigidoa_a(proyecto.getDirigidoa_a());
        model.setFechaCreacion(proyecto.getFechaCreacion());
        model.setFechaInicio(proyecto.getFechaInicio());
        model.setDuracion(proyecto.getDuracion());
        model.setFechaModificacion(proyecto.getFechaModificacion());
        model.setFechaFinalizacion(proyecto.getFechaFinalizacion());
        model.setEstado(proyecto.getEstado());
        model.setComentarios(proyecto.getComentarios());
        model.setCompromisosId(proyecto.getCompromisosId());
        model.setFechaCompromiso(proyecto.getFechaCompromiso());
        model.setFechaPrimerAvance(proyecto.getFechaPrimerAvance());
        model.setResponsables(proyecto.getResponsables());
        model.setObservacionesIniciales(proyecto.getObservacionesIniciales());
        return model;
    }

    private String generateId(String id) {
        return (id == null) ? UUID.randomUUID().toString() : id;
    }
}