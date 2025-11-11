package co.edu.udea.gestor_de_proyectos.model.proyecto;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/**
 * Modelo de respuesta para la API (ProyectoModel)
 * Contiene los campos que enviaremos al frontend.
 * Las fechas se formatean con pattern yyyy-MM-dd.
 */
@Data
public class ProyectoModel {

    private String id;
    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private double presupuesto;
    private String dirigidoa_a;
    private List<String> compromisosId;
    
    // --- CAMPO AÑADIDO (FECHA REGISTRO) ---
    private LocalDate fechaCreacion; 
    // --- FIN CAMPO AÑADIDO ---

    private LocalDate fechaModificacion;

    // --- CAMPOS AÑADIDOS ---
    private LocalDate fechaCompromiso;
    private LocalDate fechaPrimerAvance;
    // --- FIN CAMPOS AÑADIDOS ---

    // --- CAMPO AÑADIDO (DURACIÓN CALCULADA) ---
    private int duracion; 
    private LocalDate fechaInicio;
    // --- FIN CAMPO AÑADIDO ---

    private LocalDate fechaFinalizacion;
    private String estado;
    private ComentariosModel comentarios;
}
