package co.edu.udea.gestor_de_proyectos.model.usuario;

import lombok.Data;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa@dev-codes.io
 * @version Id: Udea_PI1_Gestor_proyectos 23/11/2025, 3:04 p. m.
 **/
@Data
public class ResetPasswordDTO {

    private String token;
    private String newPassword;
}
