package co.edu.udea.gestor_de_proyectos.model.proyecto;

import co.edu.udea.gestor_de_proyectos.model.dto.ComentariosDTO;
import lombok.Data;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa@dev-codes.io
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 8:36 a. m.
 **/
@Data
public class CambioDeEstadoModel {

    private String estado;
    private ComentariosDTO comentarios;
}
