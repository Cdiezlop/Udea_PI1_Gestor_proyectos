package co.edu.udea.gestor_de_proyectos.service.implement;


import co.edu.udea.gestor_de_proyectos.entity.Usuario;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.usuario.UsuarioModel;
import co.edu.udea.gestor_de_proyectos.repository.UsuarioRepository;
import co.edu.udea.gestor_de_proyectos.service.EmailService;
import co.edu.udea.gestor_de_proyectos.service.FechaActualService;
import co.edu.udea.gestor_de_proyectos.service.UsuarioService;
import co.edu.udea.gestor_de_proyectos.model.dto.LoginUsuarioDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:30 a. m.
 **/
@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final FechaActualService fechaActual;
    private final EmailService emailService;


    @Override
    public UsuarioModel crearUsuario(CrearUsuarioDTO crearUsuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setId(generateId(null));
        usuario.setNombre(crearUsuarioDTO.getNombre());
        usuario.setApellidos(crearUsuarioDTO.getApellidos());
        usuario.setEdad(crearUsuarioDTO.getEdad());
        usuario.setEstrato(crearUsuarioDTO.getEstrato());
        usuario.setFechaCreacion(fechaActual.getCurrentDate());
        usuario.setFechaModificacion(fechaActual.getCurrentDate());
        usuario.setEmail(crearUsuarioDTO.getEmail());
        usuario.setCiudad(crearUsuarioDTO.getCiudad());
        usuario.setUser(crearUsuarioDTO.getUser());
        usuario.setPassword(crearUsuarioDTO.getPassword());
        usuario.setRol("Basico");
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return mapToModel(savedUsuario);
    }

    @Override
    public Page<UsuarioModel> usuariosPaginados(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Usuario> usuariosPage = usuarioRepository.findAll(pageable);
        return usuariosPage.map(this::mapToModel);
    }

    @Override
    public UsuarioModel actualizarUsuario(String id, ActualizarUsuarioDTO actualizarUsuarioDTO) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        usuario.setNombre(actualizarUsuarioDTO.getNombre());
        usuario.setApellidos(actualizarUsuarioDTO.getApellidos());
        usuario.setEdad(actualizarUsuarioDTO.getEdad());
        usuario.setEstrato(actualizarUsuarioDTO.getEstrato());
        usuario.setCiudad(actualizarUsuarioDTO.getCiudad());
        usuario.setFechaModificacion(fechaActual.getCurrentDate());
        usuario.setEmail(actualizarUsuarioDTO.getEmail());
        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return mapToModel(updatedUsuario);
    }

    @Override
    public List<UsuarioModel> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(this::mapToModel).toList();
    }

    private UsuarioModel mapToModel(Usuario usuario) {
        UsuarioModel model = new UsuarioModel();
        model.setId(usuario.getId());
        model.setNombre(usuario.getNombre());
        model.setApellidos(usuario.getApellidos());
        model.setEdad(usuario.getEdad());
        model.setEstrato(usuario.getEstrato());
        model.setFechaCreacion(usuario.getFechaCreacion());
        model.setFechaModificacion(usuario.getFechaModificacion());
        model.setEmail(usuario.getEmail());
        model.setCiudad(usuario.getCiudad());
        model.setRol(usuario.getRol());
        model.setUser(usuario.getUser());
        return model;
    }

    private String generateId(String id) {
        return (id == null) ? UUID.randomUUID().toString() : id;
    }
    
    @Override
    public UsuarioModel autenticarUsuario(LoginUsuarioDTO loginUsuarioDTO) {
    	Usuario usuario = usuarioRepository
                .findByUserAndPassword(loginUsuarioDTO.getUser(), loginUsuarioDTO.getPassword())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario o contraseña incorrectos"));
                //.orElseThrow(() -> new RuntimeException("Usuario o contraseña incorrectos"));
    	return mapToModel(usuario);
    }
    
    @Override
    public void changePassword(String username, String newPassword, String confirmPassword) {
        // Validar que las contraseñas coincidan
        if (!newPassword.equals(confirmPassword)) {
        	throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden.");
            //throw new IllegalArgumentException("Las contraseñas no coinciden.");
        }

        // Buscar al usuario por username
        Usuario usuario = usuarioRepository.findByUser(username)
        		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
                //.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        		
        // Actualizar la contraseña
        usuario.setPassword(newPassword);
        usuarioRepository.save(usuario);
    }

    @Override
    public void solicitarRecuperacion(String email) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        String token = UUID.randomUUID().toString();

        usuario.setResetToken(token);
        usuario.setResetTokenExpiration(LocalDateTime.now().plusMinutes(30));

        usuarioRepository.save(usuario);

        String enlace = "http://localhost:8088/gestor/api/usuario/reset-password?token=" + token;

        String mensaje = """
            Hola, solicitaste recuperar tu contraseña.
            
            Haz clic en el siguiente enlace para restablecerla:
            %s

            Este enlace expirará en 30 minutos.
            """.formatted(enlace);

        emailService.sendEmail(usuario.getEmail(), "Recuperación de contraseña", mensaje);
    }

    @Override
    public void resetPassword(String token, String newPassword) {

        Usuario usuario = usuarioRepository.findByResetToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token inválido"));

        if (usuario.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El token ha expirado");
        }

        usuario.setPassword((newPassword));
        usuario.setResetToken(null);
        usuario.setResetTokenExpiration(null);

        usuarioRepository.save(usuario);
    }
}

