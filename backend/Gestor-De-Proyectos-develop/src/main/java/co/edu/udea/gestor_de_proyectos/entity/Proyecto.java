package co.edu.udea.gestor_de_proyectos.entity;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "proyectos")
public class Proyecto {
    @Id
    private String id;
    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private double presupuesto;
    private String dirigidoa_a;
    private List<String> compromisosId;
    
    private LocalDate fechaCreacion;
    private LocalDate fechaInicio;
    private LocalDate fechaModificacion;
    private LocalDate fechaCompromiso;
    private LocalDate fechaPrimerAvance;
    private LocalDate fechaFinalizacion;
    private int duracion;
    private String estado;
    
    private ComentariosModel comentarios; // Comentarios del Admin
    private String observacionesIniciales; // Comentarios del Creador
    
    private List<Responsable> responsables;
}