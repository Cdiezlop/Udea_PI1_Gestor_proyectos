package co.edu.udea.gestor_de_proyectos.entity;

import co.edu.udea.gestor_de_proyectos.model.comentarios.ComentariosModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 01/09/2025, 10:16 a. m.
 **/
@Data
@Document("proyecto")
public class Proyecto {
    @Id
    private String id;
    private String nombre;
    private String descripcion;
    private String userId;
    private String categoria;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private String estado;
    private ComentariosModel comentarios;
}
