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
@Document("compromiso")
public class Proyecto {
    @Id
    private String id;
    private String categoria;
    private String descripcion;
    private LocalDateTime fechaModificacion;
}
