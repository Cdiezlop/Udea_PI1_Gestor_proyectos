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
    private double presupuesto;
    private String dirigidoa_a;
    private List<CrearCompromisoDTO> compromisos;

    // --- CAMPOS CORREGIDOS ---
    // Se elimina 'duracion' ya que será calculada
    private LocalDate fechaInicio;
    private LocalDate fechaCompromiso; // Esta se usará como fecha final
    private LocalDate fechaPrimerAvance;
    // --- FIN CAMPOS CORREGIDOS ---

}