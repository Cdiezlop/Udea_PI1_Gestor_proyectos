package co.edu.udea.gestor_de_proyectos.controller;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import co.edu.udea.gestor_de_proyectos.service.implement.ProyectoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
public class ProyectoController {

    private final ProyectoServiceImpl proyectoService; 

    @PostMapping("/crear")
    public ResponseEntity<ProyectoModel> crearProyecto(@RequestBody CrearProyectoDTO crearProyectoDTO) {
        ProyectoModel proyectoModel = proyectoService.crearProyecto(crearProyectoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(proyectoModel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProyectoModel> obtenerProyectoPorId(@PathVariable String id) {
        ProyectoModel proyectoModel = proyectoService.proyectoPorId(id);
        return ResponseEntity.ok(proyectoModel);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProyectoModel>> listarProyectos() {
        List<ProyectoModel> proyectos = proyectoService.listarProyectos();
        return ResponseEntity.ok(proyectos);
    }

    @GetMapping("/listar/{userId}")
    public ResponseEntity<List<ProyectoModel>> listarProyectosPorUsuario(@PathVariable String userId) {
        List<ProyectoModel> proyectos = proyectoService.listarProyectosPorUsuario(userId);
        return ResponseEntity.ok(proyectos);
    }

    @GetMapping("/pagina/{page}/{size}")
    public ResponseEntity<Page<ProyectoModel>> listarProyectos(@PathVariable int page, @PathVariable int size) {
        Page<ProyectoModel> proyectos = proyectoService.proyectosPaginados(page, size);
        return ResponseEntity.ok(proyectos);
    }
    
    // Endpoint para buscar por término
    @GetMapping("/buscar/{termino}/{page}/{size}")
    public ResponseEntity<Page<ProyectoModel>> buscarProyectos(@PathVariable String termino, @PathVariable int page, @PathVariable int size) {
        Page<ProyectoModel> proyectos = proyectoService.buscarProyectosGeneral(termino, page, size);
        return ResponseEntity.ok(proyectos);
    }

    @GetMapping("/pagina/filters/{page}/{size}")
    public ResponseEntity<Page<ProyectoModel>> listarProyectos(@RequestParam(required = false) LocalDate fechaDesde,
                                                               @RequestParam(required = false) LocalDate fechafin,
                                                               @RequestParam(required = false) String estado,
                                                               @PathVariable int page,
                                                               @PathVariable int size) {
        Page<ProyectoModel> proyectos = proyectoService.proyectosPorFechaYEstado(fechaDesde, fechafin, estado, page, size);
        return ResponseEntity.ok(proyectos);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ProyectoModel> actualizarProyecto(@PathVariable String id,
                                                            @RequestBody ActualizarProyectoDTO actualizarProyectoDTO) {
        ProyectoModel proyectoModel = proyectoService.actualizarProyecto(id, actualizarProyectoDTO);
        return ResponseEntity.ok(proyectoModel);
    }

    @PutMapping("/cambiar-estado/{id}")
    public ResponseEntity<ProyectoModel> cambiarEstado(@PathVariable String id,
                                                       @RequestBody CambioDeEstadoModel cambioDeEstadoModel){
        ProyectoModel proyectoModel = proyectoService.cambiarEstado(id, cambioDeEstadoModel);
        return ResponseEntity.ok(proyectoModel);
    }
}