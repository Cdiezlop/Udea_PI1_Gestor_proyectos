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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final CompromisosRepository compromisosRepository;
    private final FechaActualService fechaActual;
    private final MongoTemplate mongoTemplate; 

    // ... (Método crearProyecto permanece IGUAL) ...
    @Override
    public ProyectoModel crearProyecto(CrearProyectoDTO crearProyectoDTO) {
        // ... (Tu código existente de crearProyecto) ...
        // (Copiar todo el contenido original de crearProyecto aquí, no cambia)
        LocalDate fechaRegistro = fechaActual.getCurrentDate().toLocalDate();

        if (crearProyectoDTO.getFechaInicio() != null) {
            LocalDate fechaMinima = fechaRegistro.plusDays(15);
            if (crearProyectoDTO.getFechaInicio().isBefore(fechaMinima)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "La fecha de inicio debe ser al menos 15 días después de la fecha actual.");
            }
        } else {
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de inicio es obligatoria.");
        }

        Proyecto proyecto = new Proyecto();
        proyecto.setId(generateId(null));
        proyecto.setNombre(crearProyectoDTO.getNombre());
        proyecto.setDescripcion(crearProyectoDTO.getDescripcion());
        proyecto.setUserId(crearProyectoDTO.getUserId());
        proyecto.setCategoria(crearProyectoDTO.getCategoria());
        proyecto.setPresupuesto(crearProyectoDTO.getPresupuesto());
        proyecto.setDirigidoa_a(crearProyectoDTO.getDirigidoa_a());
        proyecto.setObservacionesIniciales(crearProyectoDTO.getObservacionesIniciales());
        
        proyecto.setFechaCreacion(fechaRegistro);
        proyecto.setFechaModificacion(fechaRegistro);
        proyecto.setFechaInicio(crearProyectoDTO.getFechaInicio());
        
        if (crearProyectoDTO.getDuracionDias() != null && crearProyectoDTO.getDuracionDias() > 0) {
            LocalDate fCompromiso = crearProyectoDTO.getFechaInicio().plusDays(crearProyectoDTO.getDuracionDias());
            proyecto.setFechaCompromiso(fCompromiso);
            proyecto.setFechaFinalizacion(fCompromiso);
            proyecto.setDuracion(crearProyectoDTO.getDuracionDias());
        } else {
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La duración en días es obligatoria.");
        }
        
        proyecto.setEstado("Por revisar");
        proyecto.setPrioridad(1); 

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

    // MODIFICADO: Acepta userId
    @Override
    public Page<ProyectoModel> proyectosPaginados(int page, int size, String userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "prioridad").and(Sort.by(Sort.Direction.DESC, "fechaInicio"))); 
        
        if (userId != null && !userId.isEmpty()) {
            Query query = new Query().with(pageable);
            query.addCriteria(Criteria.where("userId").is(userId));
            List<Proyecto> proyectos = mongoTemplate.find(query, Proyecto.class);
            long count = mongoTemplate.count(Query.of(query).limit(0).skip(0), Proyecto.class);
            return PageableExecutionUtils.getPage(proyectos, pageable, () -> count).map(this::mapToModel);
        }

        return proyectoRepository.findAll(pageable).map(this::mapToModel);
    }

    // MODIFICADO: Acepta userId
    @Override
    public Page<ProyectoModel> proyectosPorFechaYEstado(LocalDate fechaDesde, LocalDate fechaHasta, String estado, int page, int size, String userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "prioridad").and(Sort.by(Sort.Direction.DESC, "fechaInicio")));

        Query query = new Query().with(pageable);
        List<Criteria> criteriaList = new ArrayList<>();

        if (userId != null && !userId.isEmpty()) {
            criteriaList.add(Criteria.where("userId").is(userId));
        }
        if (estado != null && !estado.trim().isEmpty()) {
            criteriaList.add(Criteria.where("estado").is(estado));
        }
        if (fechaDesde != null && fechaHasta != null) {
            criteriaList.add(Criteria.where("fechaInicio").gte(fechaDesde).lte(fechaHasta));
        } else if (fechaDesde != null) {
            criteriaList.add(Criteria.where("fechaInicio").gte(fechaDesde));
        } else if (fechaHasta != null) {
             criteriaList.add(Criteria.where("fechaInicio").lte(fechaHasta));
        }

        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        List<Proyecto> proyectos = mongoTemplate.find(query, Proyecto.class);
        long count = mongoTemplate.count(Query.of(query).limit(0).skip(0), Proyecto.class);

        return PageableExecutionUtils.getPage(proyectos, pageable, () -> count).map(this::mapToModel);
    }
    
    // ... (listarProyectosPorUsuario, proyectoPorId sin cambios) ...
    @Override
    public List<ProyectoModel> listarProyectosPorUsuario(String userId) {
        return proyectoRepository.findAllByUserId(userId).stream().map(this::mapToModel).toList();
    }

    @Override
    public ProyectoModel proyectoPorId(String proyectoId) {
        return proyectoRepository.findById(proyectoId).map(this::mapToModel).orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
    }
    
    // MODIFICADO: Acepta userId
    @Override
    public Page<ProyectoModel> buscarProyectosGeneral(String termino, int page, int size, String userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "prioridad").and(Sort.by(Sort.Direction.DESC, "fechaInicio")));
        
        Query query = new Query().with(pageable);
        List<Criteria> criteriaList = new ArrayList<>();

        // Busqueda por término (regex simple)
        if (termino != null && !termino.isEmpty()) {
            criteriaList.add(Criteria.where("nombre").regex(termino, "i"));
        }
        // Filtro de usuario
        if (userId != null && !userId.isEmpty()) {
            criteriaList.add(Criteria.where("userId").is(userId));
        }

        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        List<Proyecto> proyectos = mongoTemplate.find(query, Proyecto.class);
        long count = mongoTemplate.count(Query.of(query).limit(0).skip(0), Proyecto.class);

        return PageableExecutionUtils.getPage(proyectos, pageable, () -> count).map(this::mapToModel);
    }

    // ... (El resto de métodos actualizarProyecto, listarProyectos, cambiarEstado, mapToModel, generateId IGUALES) ...
    @Override
    public ProyectoModel actualizarProyecto(String id, ActualizarProyectoDTO dto) {
        Proyecto proyecto = proyectoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        proyecto.setNombre(dto.getNombre());
        proyecto.setCategoria(dto.getCategoria());
        proyecto.setFechaModificacion(fechaActual.getCurrentDate().toLocalDate());
        proyecto.setEstado(dto.getEstado());
        if ("Por revisar".equals(dto.getEstado())) proyecto.setPrioridad(1);
        else proyecto.setPrioridad(2);
        
        return mapToModel(proyectoRepository.save(proyecto));
    }
    
    @Override
    public List<ProyectoModel> listarProyectos() {
        return proyectoRepository.findAll().stream().map(this::mapToModel).toList();
    }

    @Override
    public ProyectoModel cambiarEstado(String id, CambioDeEstadoModel model) {
        Proyecto proyecto = proyectoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        
        ComentariosDTO cDto = model.getComentarios();
        if (cDto == null || cDto.getComentario() == null || cDto.getComentario().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Es obligatorio agregar una observación.");
        }

        proyecto.setEstado(model.getEstado());
        proyecto.setPrioridad(2);

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
        model.setResponsables(proyecto.getResponsables());
        model.setObservacionesIniciales(proyecto.getObservacionesIniciales());
        return model;
    }

    private String generateId(String id) {
        return (id == null) ? UUID.randomUUID().toString() : id;
    }
}