package co.edu.udea.gestor_de_proyectos.repository;

import co.edu.udea.gestor_de_proyectos.entity.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:21 a. m.
 **/
@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
	
	Optional<Usuario> findByUserAndPassword(String user, String password);
	Optional<Usuario> findByUser(String username);
	Optional<Usuario> findByEmail(String email);
	Optional<Usuario> findByResetToken(String resetToken);
}
