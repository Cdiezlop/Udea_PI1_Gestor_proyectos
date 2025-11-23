package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.usuario.UsuarioModel;
import co.edu.udea.gestor_de_proyectos.model.dto.LoginUsuarioDTO;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:29 a. m.
 **/
public interface UsuarioService {

    UsuarioModel crearUsuario (CrearUsuarioDTO crearUsuarioDTO);

    Page<UsuarioModel> usuariosPaginados (int page, int size);

    UsuarioModel actualizarUsuario (String id, ActualizarUsuarioDTO actualizarUsuarioDTO);

    List<UsuarioModel> listarUsuarios ();
    
    UsuarioModel autenticarUsuario(LoginUsuarioDTO loginUsuarioDTO);
    
    void changePassword(String username, String newPassword, String confirmPassword);

    void solicitarRecuperacion(String email);

    void resetPassword(String token, String newPassword);


}
