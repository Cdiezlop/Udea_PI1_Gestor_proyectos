package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;
import java.time.LocalDate; // Importamos LocalDate
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

    // --- CAMPOS CORREGIDOS ---
    // Cambiamos de LocalDateTime a LocalDate para que coincida con el input "date"
    private LocalDate fechaCompromiso;
    private LocalDate fechaPrimerAvance;
    // --- FIN CAMPOS CORREGIDOS ---

    // Estos los maneja el servicio, no es necesario enviarlos desde el frontend
    // private LocalDateTime fechaCreacion;
    // private LocalDateTime fechaModificacion;
    // private LocalDateTime fechaFinalizacion;
}