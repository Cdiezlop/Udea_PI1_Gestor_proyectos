package co.edu.udea.gestor_de_proyectos.service;

import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.LoginUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.usuario.UsuarioModel;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UsuarioService {

    UsuarioModel crearUsuario(CrearUsuarioDTO crearUsuarioDTO);

    Page<UsuarioModel> usuariosPaginados(int page, int size);

    UsuarioModel actualizarUsuario(String id, ActualizarUsuarioDTO actualizarUsuarioDTO);

    List<UsuarioModel> listarUsuarios();
    
    UsuarioModel autenticarUsuario(LoginUsuarioDTO loginUsuarioDTO);
    
    void changePassword(String username, String newPassword, String confirmPassword);

    // --- NUEVOS MÉTODOS PARA RECUPERACIÓN ---
    // Ahora recibe 'username' en lugar de 'email'
    void solicitarRecuperacion(String username);

    void resetPassword(String token, String newPassword);
}