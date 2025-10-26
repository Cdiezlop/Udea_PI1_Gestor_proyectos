package co.edu.udea.gestor_de_proyectos.controller;

import co.edu.udea.gestor_de_proyectos.model.dto.CambiarContrasenaDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.LoginUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.response.ApiResponse;
import co.edu.udea.gestor_de_proyectos.model.usuario.UsuarioModel;
import co.edu.udea.gestor_de_proyectos.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b>  01/09/2025, 10:33 a. m.
 **/
@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/crear")
    public ResponseEntity<ApiResponse<UsuarioModel>> crearUsuario(@Valid @RequestBody CrearUsuarioDTO crearUsuarioDTO) {
        try {
            UsuarioModel usuarioModel = usuarioService.crearUsuario(crearUsuarioDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(usuarioModel, "Usuario creado exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Error al crear usuario: " + e.getMessage()));
        }
    }

    @GetMapping("/pagina/{page}/{size}")
    public ResponseEntity<ApiResponse<Page<UsuarioModel>>> listarUsuariosPaginados(
            @PathVariable int page,
            @PathVariable int size) {
        try {
            Page<UsuarioModel> usuarios = usuarioService.usuariosPaginados(page, size);
            return ResponseEntity.ok(ApiResponse.success(usuarios));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Error al listar usuarios: " + e.getMessage()));
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<ApiResponse<List<UsuarioModel>>> listarUsuarios() {
        try {
            List<UsuarioModel> usuarios = usuarioService.listarUsuarios();
            return ResponseEntity.ok(ApiResponse.success(usuarios));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Error al listar usuarios: " + e.getMessage()));
        }
    }

    @PutMapping("actualizar/{id}")
    public ResponseEntity<UsuarioModel> actualizarUsuario(@PathVariable String id,
                                                          @RequestBody ActualizarUsuarioDTO actualizarUsuarioDTO) {
        UsuarioModel usuarioModel = usuarioService.actualizarUsuario(id, actualizarUsuarioDTO);
        return ResponseEntity.ok(usuarioModel);
    }
    
    @PostMapping("/login")
    public ResponseEntity<UsuarioModel> login(@RequestBody LoginUsuarioDTO loginUsuarioDTO) {
        UsuarioModel usuario = usuarioService.autenticarUsuario(loginUsuarioDTO);
        return ResponseEntity.ok(usuario);
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody CambiarContrasenaDTO changePasswordDTO) {
        usuarioService.changePassword(
            changePasswordDTO.getUsername(),
            changePasswordDTO.getNewPassword(),
            changePasswordDTO.getConfirmPassword()
        );
        
        // Crear el mapa de respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Contraseña actualizada exitosamente.");
        response.put("success", true);

        // Devolver el mapa como respuesta
        return ResponseEntity.ok(response);
    }
}
