package co.edu.udea.gestor_de_proyectos.model.dto;

import lombok.Data;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 2:55 p. m.
 **/
@Data
public class CambiarContrasenaDTO {
    private String username;
    private String newPassword;
    private String confirmPassword;
}