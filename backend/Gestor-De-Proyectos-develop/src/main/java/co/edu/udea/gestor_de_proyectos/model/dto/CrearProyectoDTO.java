package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CrearProyectoDTO {
    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private Double presupuesto;
    private String dirigidoa_a;
    private LocalDate fechaInicio;
    // Se elimina fechaCompromiso (se calcula) y fechaPrimerAvance (ya no aplica)
    private Integer duracionDias; 
    private List<CrearCompromisoDTO> compromisos;
    private List<CrearResponsableDTO> responsables;
    private String observacionesIniciales;
}