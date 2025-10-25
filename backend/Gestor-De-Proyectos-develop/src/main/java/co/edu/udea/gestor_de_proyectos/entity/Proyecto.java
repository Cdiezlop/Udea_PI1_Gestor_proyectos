package co.edu.udea.gestor_de_proyectos.entity;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa y cristian.diez
 * @version Id: <b>gestor-de-proyectos</b> 21/10/2025, 10:16 a. m.
 **/
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
    private LocalDate fechaModificacion;
    private LocalDate fechaFinalizacion;
    private String estado;
    private ComentariosModel comentarios;
}