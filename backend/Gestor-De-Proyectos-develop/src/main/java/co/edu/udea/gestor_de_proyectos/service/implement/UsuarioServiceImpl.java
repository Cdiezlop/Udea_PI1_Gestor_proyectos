package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Usuario;
import co.edu.udea.gestor_de_proyectos.model.dto.ActualizarUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.CrearUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.dto.LoginUsuarioDTO;
import co.edu.udea.gestor_de_proyectos.model.usuario.UsuarioModel;
import co.edu.udea.gestor_de_proyectos.repository.UsuarioRepository;
import co.edu.udea.gestor_de_proyectos.service.EmailService; // Importante
import co.edu.udea.gestor_de_proyectos.service.FechaActualService;
import co.edu.udea.gestor_de_proyectos.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final FechaActualService fechaActual;
    private final EmailService emailService; // Inyección del servicio de email

    // Simulación de almacenamiento de tokens (En producción usar BD o Redis)
    private final Map<String, String> tokenStorage = new ConcurrentHashMap<>();

    @Override
    public UsuarioModel crearUsuario(CrearUsuarioDTO crearUsuarioDTO) {
        if(usuarioRepository.findByUser(crearUsuarioDTO.getUser()).isPresent()){
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de usuario ya existe.");
        }

        Usuario usuario = new Usuario();
        usuario.setId(generateId(null));
        usuario.setNombre(crearUsuarioDTO.getNombre());
        usuario.setApellidos(crearUsuarioDTO.getApellidos());
        usuario.setEdad(crearUsuarioDTO.getEdad());
        usuario.setEstrato(crearUsuarioDTO.getEstrato());
        usuario.setFechaCreacion(fechaActual.getCurrentDate());
        usuario.setFechaModificacion(fechaActual.getCurrentDate());
        usuario.setCiudad(crearUsuarioDTO.getCiudad());
        usuario.setUser(crearUsuarioDTO.getUser());
        usuario.setPassword(crearUsuarioDTO.getPassword());
        usuario.setEmail(crearUsuarioDTO.getEmail());
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
    public UsuarioModel actualizarUsuario(String id, ActualizarUsuarioDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        usuario.setNombre(dto.getNombre());
        usuario.setApellidos(dto.getApellidos());
        usuario.setEdad(dto.getEdad());
        usuario.setEstrato(dto.getEstrato());
        usuario.setCiudad(dto.getCiudad());
        usuario.setFechaModificacion(fechaActual.getCurrentDate());
        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return mapToModel(updatedUsuario);
    }

    @Override
    public List<UsuarioModel> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(this::mapToModel).toList();
    }

    @Override
    public UsuarioModel autenticarUsuario(LoginUsuarioDTO dto) {
        Usuario usuario = usuarioRepository
                .findByUserAndPassword(dto.getUser(), dto.getPassword())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));
        return mapToModel(usuario);
    }
    
    @Override
    public void changePassword(String username, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden.");
        }
        Usuario usuario = usuarioRepository.findByUser(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        
        usuario.setPassword(newPassword);
        usuarioRepository.save(usuario);
    }

    // --- LÓGICA DE RECUPERACIÓN ---

    @Override
    public void solicitarRecuperacion(String username) {
        // 1. Buscar por NOMBRE DE USUARIO (no por email)
        Usuario usuario = usuarioRepository.findByUser(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe."));

        if (usuario.getEmail() == null || usuario.getEmail().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este usuario no tiene un correo asociado.");
        }

        // 2. Generar Token simple (6 dígitos)
        String token = String.valueOf((int) (Math.random() * 900000) + 100000);
        
        // 3. Guardar token asociado al email (o usuario)
        tokenStorage.put(token, usuario.getUser());

        // 4. Enviar correo (Usará el EmailService con System.out para ver en consola)
        emailService.sendEmail(
            usuario.getEmail(), 
            "Código de Recuperación - Gestor Proyectos", 
            "Hola " + usuario.getNombre() + ",\n\nTu código de recuperación es: " + token
        );
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        // 1. Validar token
        String username = tokenStorage.get(token);
        if (username == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Código inválido o expirado.");
        }

        // 2. Buscar usuario y actualizar clave
        Usuario usuario = usuarioRepository.findByUser(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));
        
        usuario.setPassword(newPassword);
        usuarioRepository.save(usuario);

        // 3. Eliminar token usado
        tokenStorage.remove(token);
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
        model.setCiudad(usuario.getCiudad());
        model.setRol(usuario.getRol());
        model.setUser(usuario.getUser());
        return model;
    }

    private String generateId(String id) {
        return (id == null) ? UUID.randomUUID().toString() : id;
    }
}

