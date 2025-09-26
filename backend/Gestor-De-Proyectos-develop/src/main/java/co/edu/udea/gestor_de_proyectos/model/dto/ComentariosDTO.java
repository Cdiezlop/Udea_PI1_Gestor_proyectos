package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 18/11/2024, 8:33 p. m.
 **/
@Data
public class ComentariosDTO {

    private String user;
    private LocalDateTime fechaComentarios;
    private String comentario;
}
