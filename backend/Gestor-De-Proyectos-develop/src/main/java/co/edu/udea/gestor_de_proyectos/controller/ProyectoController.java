package co.edu.udea.gestor_de_proyectos.controller;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearProyectoDTO;
import co.edu.udea.gestor_de_proyectos.model.proyecto.CambioDeEstadoModel;
import co.edu.udea.gestor_de_proyectos.model.proyecto.ProyectoModel;
import co.edu.udea.gestor_de_proyectos.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;

import java.util.List;

/**
 * @author Tgl. Jhoan Villa y cristian diez
 * Email: jhoan.villa  y cristian diez
 * @version Id: <b>gestor-de-proyectos</b> 01/09/2025, 10:33 a. m.
 **/
@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*") // Permitir solicitudes de cualquier origen
@RequiredArgsConstructor
public class ProyectoController {

    private final ProyectoService proyectoService;

    @PostMapping("/crear")
    public ResponseEntity<ProyectoModel> crearProyecto(@Valid @RequestBody CrearProyectoDTO crearProyectoDTO) {
        ProyectoModel proyectoModel = proyectoService.crearProyecto(crearProyectoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(proyectoModel);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProyectoModel>> listar() {
        return ResponseEntity.ok(proyectoService.listarProyectos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProyectoModel> obtener(@PathVariable String id) {
        return ResponseEntity.ok(proyectoService.proyectoPorId(id));
    }

    // Endpoint para actualizar estado (usado por admin)
    @PutMapping("/{id}/estado")
    public ResponseEntity<Void> cambiarEstado(@PathVariable String id, @RequestBody EstadoRequest body) {
        proyectoService.cambiarEstado(id, body.getEstado());
        return ResponseEntity.ok().build();
    }

    // Clase interna simple para recibir { "estado": "Terminado" }
    public static class EstadoRequest {
        private String estado;
        public String getEstado() { return estado; }
        public void setEstado(String estado) { this.estado = estado; }
    }
}