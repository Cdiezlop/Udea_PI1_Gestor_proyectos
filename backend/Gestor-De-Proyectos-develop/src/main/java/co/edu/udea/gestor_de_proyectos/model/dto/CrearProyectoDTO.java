package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CrearProyectoDTO {

    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private double presupuesto;
    private String dirigidoa_a;
    private List<CrearCompromisoDTO> compromisos;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private LocalDateTime fechaFinalizacion;
}