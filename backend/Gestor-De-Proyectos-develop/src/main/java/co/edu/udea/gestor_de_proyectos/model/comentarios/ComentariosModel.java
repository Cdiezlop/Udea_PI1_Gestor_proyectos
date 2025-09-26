package co.edu.udea.gestor_de_proyectos.model.comentarios;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b>  01/09/2025, 8:35 a. m.
 **/
@Data
public class ComentariosModel {

    private String user;
    private LocalDateTime fechaComentarios;
    private String tipoComentario;
    private String comentario;
}
