package co.edu.udea.gestor_de_proyectos.entity;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "proyectos")
public class Proyecto {

    @Id
    private String id;
    @NotEmpty
    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private Double presupuesto;
    private String dirigidoa_a; // En el front se mostrará como "Observaciones Generales"
    private LocalDate fechaCreacion;
    private LocalDate fechaInicio;
    private LocalDate fechaCompromiso;
    private LocalDate fechaFinalizacion;
    private LocalDate fechaPrimerAvance; // Se mantiene en BD por compatibilidad, pero no se usa en Front
    private LocalDate fechaModificacion;
    private int duracion;
    private String estado;
    
    // Campo nuevo para ordenar: 1="Por revisar", 2="Resto"
    private Integer prioridad;

    private List<String> compromisosId;
    private List<Responsable> responsables;
    private ComentariosModel comentarios;
    private String observacionesIniciales;
}