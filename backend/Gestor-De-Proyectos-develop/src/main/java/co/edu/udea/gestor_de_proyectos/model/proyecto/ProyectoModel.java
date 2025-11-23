package co.edu.udea.gestor_de_proyectos.model.proyecto;

import co.edu.udea.gestor_de_proyectos.entity.Responsable;
import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

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
    
    private LocalDate fechaCreacion;
    private LocalDate fechaModificacion;
    private LocalDate fechaCompromiso;
    private LocalDate fechaPrimerAvance;
    private int duracion; 
    private LocalDate fechaInicio;
    private LocalDate fechaFinalizacion;
    
    private String estado;
    private ComentariosModel comentarios; // Admin
    private String observacionesIniciales; // Creador
    
    private List<Responsable> responsables;
}